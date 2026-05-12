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
  document.documentElement.style.setProperty('--color-background', 'black');
  document.documentElement.style.setProperty('--image-background', 'none');
  document.documentElement.style.setProperty('--menu-background', '#8B6FA7');
  document.documentElement.style.setProperty('--menu-selected-back', 'black');
  document.documentElement.style.setProperty('--menu-selected-color', 'white');

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
  <div class="title">
    <h1 ref="titreRef">Lore</h1>
  </div>
  <hr class="horizontalSeparator" />

  <div class="page" ref="contentRef">

    <div class="container">
      <div class="content" ref="contentRef">
        <h1 id="titre1">Divinités</h1>
        <br>
        <p>Monde millénaire et merveilleux, Lutéa renferme le meilleur, et surement le pire, de ce que la nature et la magie peut créer.</p></br>
<br>
<p>Au commencement, Retea s’ennuyait. Beaucoup. Iel vivait dans un plan vide, quoique merveilleux, des milliers de kilomètre (iel a compté) de nuages doux comme du coton, perturbé seulement par une brise légère.
De peur de perturber son immense tranquillité, iel s’est décidé a créer un nouveau plan: {monde}
Pour l’aider dans cette tâche, iel donne naissance à 3 divinités: Pros, dieu du Corps, Aéri, dieu de l’Esprit, et Démo, dieu du Monde. Mais son envie de contrôle et de perfection se trouve perturbée quand, 
du chaos magique induit par la création de 3 divinités et un plan d’existence, Wras, dieu du Chaos, se matérialise.</p>
<br>
<li>- Pros/ personnalité</li>
<li>- Aéri/ personnalité</li>
<li>- Démo/ personnalité</li>
<li>- Wras/ personnalité</li>
<br>
<p>Aujourd’hui, Retea reste caché-e dans son plan et se désintéresse complètement de la création qui lui a échappée, laissant le contrôle total à ses enfants légitimes. 
  Sa dernière action avant uen retraite discutable aura été la formation d’un autre plan, minuscule, sombre et hostile, pour y enfermer {dieu Chaos} en espérant que cela suffise à faire disparaitre ses erreurs.</p>
<br>
        <h1 id="titre2">Géographie</h1>
<p><i>Contenu</i></p>
      </div>
      <hr class="verticalSeparator" />
      <div class="sideContent">
        <p class="sideText first-color">Lore</p>
        <p class="sideSeparator first-color">·</p>
        <p class="sideText2 first-color">Lore</p>
      </div>
    </div>
    <br>
    <hr id="midPoint" class="horizontalSeparator" />
    <div class="container">
      <div class="sideContent2">
        <p class="sideText second-color">Lore</p>
        <p class="sideSeparator second-color">·</p>
        <p class="sideText2 second-color">Lore</p>
      </div>
      <div class="content" ref="contentRef">
        <div class="separatorExample">
          <hr class="verticalSeparator2" />
          <div>
            <h1 id="titre3">Langues & Peuples</h1>
            <br>
            <p>Dans Lutéa, on connait multiples espèces, peuples, cultures différentes, qui se mélangent tant bien que mal.</p>
            <br>
            <p>Il y existe toute sorte de communautés, des méga-métropoles comme {Ville majeure}, ou les humains, elfes, et races mineures vivent en harmonies, aux plus petites tribu Roches de Chenyu, encore jamais approchées de l’extérieur.
            </p>
            <br>
            <p>Si les peuples ont tous leurs variations régionales et culturelles, ils s’accordent sur une {langue commune} qui sera parlée dans les grandes villes, et par défaut entre des races différentes. </p>
            <br>
          </div>
        </div>
        <br>
        <div class="separatorExample">
          <hr class="verticalSeparator2" />
          <div>
            <h1 id="titre4">Magie & Corruption</h1>
            <p>Lutéa a été créé, détruit, reconstruit et blessé par la magie. 
              On y craint la corruption autant qu’on prie pour la lumière de Pros pour la guérison, et les anciens mettent en garde les têtes-brulées qui l’utilise sans raison. </p>
            <br>
            <p>Depuis la naissance de Wras, on sait comment la magie peut être destructrice. 
              Pour autant, elle fait partie du quotidien de la plupart des habitants de Lutéa, sous multiple formes: alchimie, sortilèges, et les redoutés corrompu que l’on croise, parfois, et qui sont rarement ce qu’on attend.</p>
            <br>
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
  color: #D4D3D2;
}

.content {
  width: 60%;
  margin: 0 auto;
  transform: translateX(11vw);
  margin-bottom: 5vw;
  margin-top: 1vw;
}

.content>* {
  color: #D4D3D2;
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
  font-size: 6vw;
  transform: rotate(90deg) translate(2vw, 0.5vw);
  margin-top: 5vw;
  letter-spacing: 0.5vw;
  font-weight: 500;
  white-space: nowrap;
  align-self: flex-start;
}

.sideSeparator {
  font-size: 11vw;
  transform: rotate(90deg) translate(4vw, -1vw);
  margin-top: 2vw;
  letter-spacing: 0.5vw;
  font-weight: 500;
  white-space: nowrap;
}

.sideText2 {
  font-size: 6vw;
  transform: rotate(90deg) translate(-2vw, -2.5vw);
  margin-bottom: 2vw;
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
.example {
  position: relative;
  margin-top: 1vw;
  width: 100%;
}

.first-example {
  transform: translateX(-5vw);
}

.second-example {
  transform: translateX(-2vw);
}

.bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.example-content {
  padding: 3vw;
  margin-left: 2vw;
  padding-top: 5vw;
  position: relative;
  z-index: 1;
  /*transform: translate(3vw, -20vw);*/
}

@media screen and (max-width: 800px) {
  .example-content {
    padding-top: 17vw;
  }
}

.example-content>* {
  color: #000000;
}
</style>
