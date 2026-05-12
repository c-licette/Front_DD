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
    <h1 ref="titreRef">Les Races</h1>
  </div>
  <hr class="horizontalSeparator" />

  <div class="page" ref="contentRef">

    <div class="container">
      <div class="content" ref="contentRef">
        <h1 id="titre1">Humain-es</h1><br>
          <p>Race la plus répandue et commune, les humaines et humains sont à l’origine d’une grande partie des métropoles de {monde}: {noms de villes ??}. 
          Iels sont connu-es pour leur grande sociabilité et adaptabilité à toute situation, quoiqu’iels gardent une préférence pour leur propre espèce. 
          Iels ont tendance à se mouler dans leur environnement en valeurs, et code moraux.</p>
          <p>Iels ne maitrisent pas la magie.</p><br>
        <h3>Où vivent-iels?</h3><br>
          <p>Nomades comme sédentaires, iels s’adaptent très facilement à de nouveaux peuples et environnements, même s’il existe des villes majoritairement humaines.</p><br>
        <h3>Leur point de vue sur le monde</h3><br>
          <p>Dépendant de leur environnement social et géographique, va se conformer à ce qui les entoure.</p><br>
        <h3>Classes typique</h3><br>
          <p>Peuvent se conformer à toutes les classes non-magiques, avec un avantage naturel pour les Traducteur-ice</p><br>
        <h3>Bonus de stats</h3><br>
          <p>+1 dans chaque compétence au choix de Corps, d’Esprit, et de Monde.</p><br>
        <h3>Vue sur la corruption</h3><br>
          <p>Peut dépendre d’un individu à l’autre, mais garde un tabou autour de la manipulation mentale non-consentie d’un humain sur un autre, et auront tendance à être méfiant.</p>
          <p>Certains humains ont un point de vue très extreme, positif ou négatif, sur la corruption.</p><br>
        
        
        <h1 id="titre2">Elfes</h1><br>
          <p>Très érudits, iels parlent leur °propre langue°, ainsi que le *langue magique* et le commun, certains apprennent le °volant°</p>
          <p>Race magique construite en société matriarcale très structurée et développée, en culture, en savoir, en technique, les elfes vivent en société fermée autour de lieux spirituels et magiques (relique divines, noyaux magiques ...) Iels ne se mélange pas aux autres peuples. 
          Etaient respectés et considéré comme une race noble, mais leur désintérêt pour le reste du monde les fait tomber en désuétude.</p><br>
        <h3>Histoire</h3><br>
          <p>Autrefois respecté pour leur puissance et droiture, les elfes ont subit le contrecoup d’ignorer la corruption inhérente à la magie. 
          L’explosion d’un noyau magique majeur a conduit à la descente des elfes, la création des elfes noirs et de monstres terribles, et des répercussions dans tous les noyaux magiques du monde.</p><br>
        <h3>Où vivent-iels?</h3><br>
          <p>Vivent autour de noyaux magiques, qu’iels gardent jalousement, pour construire de façon optimisée leurs bâtiments hyper-technologiques.</p><br>
        <h3>Leur point de vue sur le monde</h3><br>
          <p>Se désintéressent complètement des autres races, lieux, et vont mêmes les prendre de haut pour avoir des valeurs qui diffère des leurs. 
          Peuvent se montrer cruels envers les elfes qui dérivent de leurs moeurs. 
          Iels portent un grand intérêt au respect, à l’éducation, à l’art et au savoir.</p><br>
        <h3>Classes typique</h3><br>
          <p>Comportent beaucoup de Magicien-ne et de Techno-Magicien-nes, et moins souvent Artiste ou Protecteur-ice</p><br>
        <h3>Bonus de stats</h3><br>
          <p>+3 en Esprit, +1 en Corps, -1 en Communication</p><br>
        <h3>Vue sur la corruption</h3><br>
          <p>Enorme tabou, voient les corrompu-es comme des êtres mauvais et dangereux.</p><br>
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
          <h1 id="titre3">Reptides</h1><br>
          <p>Race non-magique, vivant dans un respect de la nature et des autres. 
            Iels sont joyeux et ouverts, ne se fâchent pas facilement, mais ne pardonne pas une fois trahi-es. Iels aiment le spectacle, le jeu, ont pleins de loisirs. 
            S’expriment majoritairement par signes, même s’iels maitrisent le {commun}.</p><br>
        <h3>Où vivent-iels?</h3><br>
          <p>Dans des milieux naturels (forêt, montagnes, marais), qu’iels gardent aussi inaltérés que possible. 
            On les croise peu dans les milieux industriels et urbains, sauf dans des marchés ou représentations.</p><br>
        <h3>Leur point de vue sur le monde</h3><br>
          <p>N’aiment des les elfes, qui manquent de respect envers leurs noyaux magiques et lieux de vie en général. 
            Certains Reptides peuvent refuser de traiter, voire parler, avec un elfe.</p><br>
        <h3>Classes typique</h3><br>
          <p>Presque tous les Reptides sont des Sauvages, avec quelques Artistes, Protecteur-ices ou Technicien-nes</p><br>
        <h3>Bonus de stats</h3><br>
          <p>+2 en Survie et Nature, +1 en Dextérité, -1 en Savoir</p><br>
        <h3>Vue sur la corruption</h3><br>
          <p>Voient la corruption et la magie comme 2 faces d’une même pièce, aussi dangereuse l’une que l’autre et à utiliser qu’en cas de nécessité.</p><br>
          </div>
        </div>
        <div class="separatorExample">
          <hr class="verticalSeparator2" />
          <div>
            <h1 id="titre4">Chimères</h1><br>
              <p>Race magique absurde, qui ne s’attache pas aux règles et aux lois, sans concept d’autorité. 
              Iels sont décrit comme descendant de Wras.</p><br>
            <h3>Où vivent-iels?</h3><br>
          <p>Ne se regroupent pas entre eux, ont tendance à explorer le monde. 
          On les retrouve dans les grandes villes comme dans les lieux les plus improbables, milieu du désert et noyaux magiques.</p><br>
        <h3>Leur point de vue sur le monde</h3><br>
          <p>Voient le monde comme leur terrain de jeux, ont des a-priori sur les autres races uniquement pour s’en moquer et blaguer avec (ou sans) elleux.</p><br>
        <h3>Classes typique</h3><br>
          <p>Souvent Magicien-ne ou Corrompu-es, voire les deux.</p><br>
        <h3>Bonus de stats</h3><br>
          <p>+1 en Discernement, Communication, Intuition et Résilience</p><br>
        <h3>Vue sur la corruption</h3><br>
          <p>La voit comme une magie, s’en amusent, aiment son potentiel chaotique.</p><br>

        <h1 id="titre5">Volant-es</h1><br>
          <p>Race qui peut être magique, de façon a priori aléatoire. 
            Timide et méfiant, iels ne font pas confiance facilement, même à d’autres Volants de tribus éloignées. 
            De très petite taille, iels compensent ce physique par leur capacité à voler et une impartialité et une sagesse vis-à-vis des autres races.</p><br>
        <h3>Où vivent-iels?</h3><br>
          <p>Iels vivent dans des zones reculées, peu accessibles, en haut des montagnes ou au sommet et au coeur des forêts. 
            Iels se font discrets</p><br>
        <h3>Leur point de vue sur le monde</h3><br>
          <p>Casanier-es, iels ne vont pas se mélanger s’il n’en ont pas besoin. 
            On peut les croiser de passage dans des villes, mais pas plus. 
            Sont neutres des conflits inter-espèces, respectent les autres points de vue et traditions.</p><br>
        <h3>Classes typique</h3><br>
          <p>Bons Traducteurs et Artistes, peuvent être Magiciens ou Techniciens selon leurs parcours</p><br>
        <h3>Bonus de stats</h3><br>
          <p>+1 en Esprit, +1 en Discernement, -1 en Force</p><br>
        <h3>Vue sur la corruption</h3><br>
          <p>En ont peur, car iels ont pu voir les effets sur les elfes. 
            Préfèrent se tenir a l’écart, sans mettre de préjugé sur les corrompus.</p><br>
        <h1 id="titre6">Rocs</h1><br>
          <p>Les plus aventureux parlent le °commun°, mais la grande majorité parlent uniquement °monolithe°</p>
          <p>Race qui peut être magique, selon les tribus. 
            Minoritaire, complètement indépendant du monde moderne. 
            Ont une aura presque mystique pour les autres races, qu’iels croisent rarement.</p><br>
        <h3>Où vivent-iels?</h3><br>
          <p>Vivent reclus, dans des souterrains et des montagnes. 
            On ne sait pas vraiment où. 
            Extremement fort-es, iels ne craignent pas grand chose.</p><br>
        <h3>Leur point de vue sur le monde</h3><br>
          <p>En sont détaché. Certains, lors de leur rite de majorité, sont tombé sur la civilisation, et racontent plein d’histoires étranges sur les technologies, les rites et les cultures du monde.</p><br>
        <h3>Classes typique</h3><br>
          <p>Protecteur-ices avant tout, parfois Sauvages</p><br>
        <h3>Bonus de stats</h3><br>
          <p>+1 en Corps, -1 en Discernement, malus dexterite ?.</p><br>
        <h3>Vue sur la corruption</h3><br>
          <p>Ne la connaissent pas tel quel, mais racontent des mythes et légendes sur la force du désespoir et le mal noir.</p><br>
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
