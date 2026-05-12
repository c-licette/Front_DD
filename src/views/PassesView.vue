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
    <h1 ref="titreRef">Passés</h1>
  </div>
  <hr class="horizontalSeparator" />

  <div class="page" ref="contentRef">

    <div class="container">
      <div class="content" ref="contentRef">

        <h1 id="titre1">Éveillé</h1><br>
          <p>Donne accès a la magie aux races qui en sont dépourvues.</p><br>

        <h1 id="titre2">Ailé </h1><br>
          <p>Donne accès au vol aux races qui en sont dépourvues.</p><br>

        <h1 id="titre3">Nature</h1><br>
          <p>Bonus connaissance milieu sauvage.</p><br>
          
        <h1 id="titre4">Apothicaire</h1><br>
          <p>Connaissance en plante.</p><br>

        <h1 id="titre5">Voleur des rues </h1><br>
          <p>Furtif</p><br>

        <h1 id="titre6">Hannah Montana</h1><br>
          <p>Possède une 2e persona - Avantage à endosser le perso</p><br>
       
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
          
          </div>
        </div>
        <div class="separatorExample">
          <hr class="verticalSeparator2" />
          <div>
        <h1 id="titre7">Apôtre</h1><br>
          <p>Connexion privilègiée a 1 dieu - Bonus sur son dieu, malus sur les autres</p><br>
        
          <h1 id="titre8">Chanceux </h1><br>
          <p>Héritage magique - un objet magique</p><br>

        <h1 id="titre9">Marchand </h1><br>
          <p>Met gens en confiance - avantage en début de conversation</p><br>

        <h1 id="titre10">Medic </h1><br>
          <p>Connaissance corps - Augmente dégats & soins</p><br>
        
        <h1 id="titre11">Pragmatique  </h1><br>
          <p>Deteste toutes les religions - Résistance Magie</p><br>
        
        <h1 id="titre12">Pyromance </h1><br>
          <p>Self explanatory - Sort flamme mineur</p><br>
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
