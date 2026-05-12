<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, inject } from 'vue'
import { extractHeadings } from '../utils/extractHeadings'

const contentRef = ref<HTMLElement | null>(null)
const setPageHeadings = inject('setPageHeadings') as ((items: { label: string; to?: string }[] | null) => void) | undefined
const setActiveHeadingId = inject('setActiveHeadingId') as (id: string | null) => void;

onMounted(() => {
  if (!contentRef.value) return
  const midPoint = document.querySelector("#midPoint")
  const headings = extractHeadings(contentRef.value)
  setPageHeadings?.(headings.map((h) => ({ label: h.label, to: h.to })))
  document.documentElement.style.setProperty('--color-background', 'white');
  document.documentElement.style.setProperty('--image-background', 'url("/src/assets/background_light.png")');
  document.documentElement.style.setProperty('--menu-background', '#8B6FA7');
  document.documentElement.style.setProperty('--menu-selected-back', 'white');
  document.documentElement.style.setProperty('--menu-selected-color', 'black');

  const headingList = contentRef.value.querySelectorAll('h1[id]');
  const observerMenu = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveHeadingId(entry.target.id);
        }
      });
    },
    { threshold: 0.5 } // Seuil de visibilité
  );

  const observerTheme = new IntersectionObserver(([entry]) => {
    if (entry.boundingClientRect.top > 0) {
      document.documentElement.style.setProperty('--menu-background', '#8B6FA7');
    }
    else {
      document.documentElement.style.setProperty('--menu-background', '#D86C9D');
    }
  });

  headingList.forEach((heading) => {
    observerMenu.observe(heading);
    if (midPoint){
      observerTheme.observe(midPoint);
    }
  });

  onBeforeUnmount(() => {
    headingList.forEach((heading) => {
      observerMenu.unobserve(heading);
    });
    if (midPoint){
      observerTheme.unobserve(midPoint);
    }
  });
})

onBeforeUnmount(() => {
  setPageHeadings?.(null)
})
</script>

<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link
    href="https://fonts.googleapis.com/css2?family=Creepster&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Karma:wght@300;400;500;600;700&family=Lexend+Exa:wght@100..900&display=swap"
    rel="stylesheet">

  <div class="title">
    <h1 ref="titreRef">Les Classes</h1>
  </div>
  <hr class="horizontalSeparator" />

  <div class="page" ref="contentRef">

    <div class="container">
      <div class="content" ref="contentRef">

        <h1 id="titre1">Protecteur-trice</h1><br>
          <p>Défini par leur force et les capacités à se protèger et à proteger autrui, iels ont souvent une cause à défendre. </p><br>
        <h3>Stats nécessaire</h3><br>
          <p>3+ dans au moins 2 compétences de Corps</p><br>
        <h3>Capacité de classe</h3><br>
        <li>6e sens</li>
        <p>Si quelqu’un l’observe avec des intentions “mauvaises”, il le sentira même s’il est de dos → +1 dés</p><br>
        <li>Dernière chance</li>
        <p>Dans le cas ou un allié va prendre un coup, peut prendre le coup à la place → prend les dégats</p><br>
        
        <h1 id="titre2">Magicien-ne</h1><br>
          <p>Loyal a une ou plusieurs divinités, un-e magicien-ne utilise son pouvoir selon son code moral. </p><br>
        <h3>Stats nécessaire</h3><br>
          <p> 3+ en Intuition ou Savoir, maitrise de la Magie</p><br>
        <h3>Capacité de classe</h3><br>
        <li>Appel de Divinité</li>
        <p>Permet de communiquer avec une divinité pour avoir un bonus en mind/body/world pour 1 réussite</p><br>
        <li>Communication Divine</li>
        <p>Peut interpréter et communiquer avec les objets & esprits magiques</p><br>
       
      </div>
      <hr class="verticalSeparator" />
      <div class="sideContent">
        <p class="sideText first-color">Le Vivant</p>
        <p class="sideSeparator first-color">·</p>
        <p class="sideText2 first-color">Le Vivant</p>
      </div>
    </div>
    <br>
    <hr id="midPoint" class="horizontalSeparator" />
    <div class="container">
      <div class="sideContent2">
        <p class="sideText second-color">Le Vivant</p>
        <p class="sideSeparator second-color">·</p>
        <p class="sideText2 second-color">Le Vivant</p>
      </div>
      <div class="content" ref="contentRef">
        <div class="separatorExample">
          <hr class="verticalSeparator2" />
          <div>
          <h1 id="titre3">Interprète</h1><br>
          <p>Liant entre les peuples et les gens aux interets divergeants, iels sont essentiels dans les villes.</p><br>
        <h3>Stats nécessaire</h3><br>
          <p> 3+ dans au moins 2 compétences en Monde</p><br>
        <h3>Capacité de classe</h3><br>
        <li>Facilité de langues</li>
        <li>Instinct Potin</li>
        <p>Faciliter a trouver, comprendre et lancer des potins → +1 jet dans ce cas</p><br>
       
          </div>
        </div>
        <div class="separatorExample">
          <hr class="verticalSeparator2" />
          <div>
        <h1 id="titre4">Recueilli-e</h1><br>
          <p>Abandonné-e, iels ont trouvé une nouvelle famille où s’épanouir, et ont fait de leur adaptilité une force. </p><br>
        <h3>Stats nécessaire</h3><br>
          <p> 3+ en Résilience</p><br>
        <h3>Capacité de classe</h3><br>
        <li>Souvenir du passé</li>
        <p>Récupère capacité de son origine.</p><br>
        <li>“je suis déjà venu ici”</li>
        <p>Peut apprendre des mimiques/Tradition/habitude en simplement en observant</p><br>
       
        <h1 id="titre5">Technicien-ne</h1><br>
          <p>Proche des magiciens, iels utilisent technique et magie pour créer des objets pour arriver a leurs fins, sous forme de potions, armes, gadgets variés. 
            Souvent malicieux-ses et débrouillard-es, iels ont toujours solution à tout (surtout si on a besoin d’exploser)</p><br>
        <h3>Stats nécessaire</h3><br>
          <p> 3+ en Monde</p><br>
        <h3>Capacité de classe</h3><br>
        <li>Regard de créateur</li>
        <p>Permet de voir les amélioration/magie appliqué à une arme/ armure, et dans une mesure de les répliquer</p><br>
        <li>Grimoire du souvenir</li>
        <p>Permets de crées des object de niveaux supérieur au siens seulement si il a acumulé les idées/techniques/inspiration dans son grimoire des souvenirs</p><br>
        
        <h1 id="titre6">Corrompu-e</h1><br>
          <p>Les Corrompu-es étaient des êtres vivants classiques, à un moment de leurs vies. 
            Peut-être même des nobles, des religieu-ses. 
            À un moment pivot, le risque qu’iels ont prit, à utiliser la corruption, s’est retourné contre elle-eux et les à consumé-e. 
            S’iels peuvent être des personnes tout à fait saines et équilibrées, c’est rarement le cas, et iels sont souvent stigmatisé-es.</p><br>
        <h3>Stats nécessaire</h3><br>
          <p> 3+ dans une compétence d’Esprit</p><br>
        <h3>Capacité de classe</h3><br>
        <li>Soin Destructeur</li>
        <p>Permet de se soigner/ quelqu’un d’autre mais ça prendra la vitalité des plantes autour (biome)</p><br>
        </div>
        </div>
      </div>
    </div>
  </div>
  <br>


</template>

<style scoped>
.title {
  text-align: center;
  padding-bottom: 10vw;
  padding-top: 5vw;
}

.title>h1 {
  font-size: 6vw;
  font-family: "Lexend Exa", sans-serif;
  color: #8B6FA7;
}

.content {
  width: 60%;
  margin: 0 auto;
  transform: translateX(11vw);
  margin-bottom: 5vw;
  margin-top: 1vw;
}

.content>* {
  color: black;
}

li {
  margin-left: 1.3vw;
}

.container {
  display: flex;


}

.sideContent {
  width: 11vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.sideContent2 {
  width: 11vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  transform: translateX(23vw);
}

.verticalSeparator2 {
  margin-right: 3vw;
  margin-bottom: -5vw;
}

.sideText {
  font-size: 5vw;
  transform: rotate(90deg) translate(8vw, 8vw);
  margin-top:5vw;
  letter-spacing: 0.5vw;
  font-weight: 500;
  white-space: nowrap;
  align-self: flex-start;
}

.sideSeparator {
  font-size: 10vw;
  transform: rotate(90deg) translate(3vw, -0.5vw);
  margin-top: 2vw;
  letter-spacing: 0.5vw;
  font-weight: 500;
  white-space: nowrap;
}

.sideText2 {
  font-size: 5vw;
  transform: rotate(90deg) translate(-12.5vw, -8vw);
  margin-top: 2vw;
  letter-spacing: 0.5vw;
  font-weight: 500;
  white-space: nowrap;
  align-self: flex-end;
}

.first-color {
  color: #8B6FA7;
}

.second-color {
  color: #D86C9D;
}

.horizontalSeparator {
  width: 73%;
  position: absolute;
  margin-right: 2vw;
  right: 0;
}

.separatorExample {
  display: flex;
}


@media screen and (max-width: 800px) {

  .example-content {
    padding-top: 17vw;
  }
}

</style>
