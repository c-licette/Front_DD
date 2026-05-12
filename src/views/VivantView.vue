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
    <h1 ref="titreRef">Le Vivant</h1>
  </div>
  <hr class="horizontalSeparator" />

  <div class="page" ref="contentRef">

    <div class="container">
      <div class="content" ref="contentRef">
        <h1 id="titre1">A/ Règles générales</h1>
        <p>Contenu</p>

        <h1 id="titre2">B/ Système de dés</h1>
        <p>Pour réaliser une action, le joueur peut faire appel à plusieurs types de caractéristiques et répartit en
          compétences du corps, de l'esprit et des interactions :</p>
        <li>Corps : Force / Dextérité / Technique / Résistance</li>
        <li>Esprit : Intuition / Savoir / Résilience</li>
        <li>Interaction : Communication / Discernement / Survie / Nature</li>
        <br>
        <p>Chaque race a ses propres capacités et peut en acquérir.</p>
        <br>
        <p>
          Lors d'une action, le joueur doit réaliser une épreuve aux dés. Il convient ensuite au MJ de décider quel
          attribut et quelle compétence sont à utiliser. L'idée est Système/Base D6.
        </p>
        <p>Un personnage entraîné dans un domaine lancera plus de dés qu'un novice.</p>
        <br>
        <br>
        <p>Conséquence par résultats :</p>
        <p>Base Dé 6, résultats des lancés :</p>
        <li>1,2,3/ Echec - le lanceur échoue son action</li>
        <li>4,5/ Réussite - le lanceur réussit son action</li>
        <li>6/ Réussite critique - le lanceur échoue mais son action offre une opportunité à la situation.</li>
        <li>1/ Echec critique - le lanceur réussi mais prend un risque</li>
        <br>
        <div class="example first-example">
          <svg class="bg" viewBox="0 0 160 100" preserveAspectRatio="none">
            <path
              d="M 0 50 C 3 -57 97 47 142 15 C 156 11 155.3333 21.6667 156 26 L 156 85 C 155 91 157 96 147 98 L 10 100 C 0 99 2 95 0 56 Z"
              fill="#8B6FA7" />
          </svg>
          <div class="example-content">
            <p>Exemples de lancer :</p>
            <li>Léa, qui joue un Protecteur, veut frapper un ennemi avec une capacité de Force. Son personnage,
              habitué
              aux batailles, a 4 dès. Elle fait 1, 3, 3 et 4, elle doit faire minimum 1 pour réussir son action. Son
              jet à
              1 réussite et 2 échecs, mais avec un échec critique. Son personnage touche le Méchant par une attaque
              faible, mais dans l'élan perd l'équilibre.</li>
            <li>Zephyr, lui, joue un Interprète, qui n'a qu'un dé. Il fait 6 en communication. Son jet échoue, mais
              avec
              une réussite critique. Son personnage rate sa négociation avec le PNJ, mais distrait le PNJ et provoque
              une
              opportunité pour un allié.</li>
          </div>
        </div>
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
            <p>Difficultés par résultats : </p>
            <li>1 : Presque évident</li>
            <li>2,3 : Simple</li>
            <li>4,5 : Complexe</li>
            <li>6 : Pro</li>
            <p>La difficulté est déterminée par le MJ, par exemple une puissante créature attaque : il faut faire 5
              réussites pour l'esquiver. Le nombre de dés à lancer dépend du niveau et des compétences du joueur ou des
              ennemis. Plus le niveau et les statistiques du joueur ou de l'ennemi est élevé, plus le nombre de dés
              lancé
              sera important, sans compter certains effets bonus.</p>
            <br>
            <h1 id="titre3">C/ Caractéristiques</h1>
            <br>
            <p>Background - Capacité associée - Annotation</p>
            <br>
            <p>Éveillé - Donne accès à la magie aux races qui en sont dépourvues - Origine au choix (génie, amulette,
              etc)
            </p>
            <br>
            <p>Ailé - Donne accès au vol aux races qui en sont dépourvues - Origine au choix </p>
            <br>
            <p>Nature - Bonus connaissance milieu sauvage - Origine au choix</p>
            <br>
            <p>Apothicaire - Connaissance en plante - Sort mineur de soin à préparer </p>
            <br>
            <p>Voleur des rues - Furtif - Pas silencieux</p>
            <br>
            <p>Hannah Montana - Possède une 2e persona - Avantage à endosser le perso</p>
            <br>
            <p>Apôtre - Connexion privilègiée a 1 dieu - Bonus sur son dieu, malus sur les autres</p>
            <br>
            <p>Chanceux - Héritage magique - un objet magique</p>
            <br>
            <p>Marchand - Met gens en confiance - avantage en début de conversation </p>
            <br>
            <p>Medic - Connaissance corps - Augmente dégats</p>
            <br>
            <p>Pragmatique - Deteste toutes les religions - Résistance Magie</p>
            <br>
            <p>Pyromance - Self explanatory - Sort flamme mineur</p>
          </div>
        </div>
        <br>
        <div class="example second-example">
          <svg class="bg" viewBox="0 0 160 100" preserveAspectRatio="none">
            <path
              d="M 0 50 C 3 -57 97 47 142 15 C 156 11 155.3333 21.6667 156 26 L 156 85 C 155 91 157 96 147 98 L 10 100 C 0 99 2 95 0 56 Z"
              fill="#D86C9D" />
          </svg>
          <div class="example-content">
            <p>Exemples de lancer :</p>
            <li>Léa, qui joue un Protecteur, veut frapper un ennemi avec une capacité de Force. Son personnage,
              habitué
              aux batailles, a 4 dès. Elle fait 1, 3, 3 et 4, elle doit faire minimum 1 pour réussir son action. Son
              jet à
              1 réussite et 2 échecs, mais avec un échec critique. Son personnage touche le Méchant par une attaque
              faible, mais dans l'élan perd l'équilibre.</li>
            <li>Zephyr, lui, joue un Interprète, qui n'a qu'un dé. Il fait 6 en communication. Son jet échoue, mais
              avec
              une réussite critique. Son personnage rate sa négociation avec le PNJ, mais distrait le PNJ et provoque
              une
              opportunité pour un allié.</li>
          </div>
        </div>
        <br>
        <div class="separatorExample">
          <hr class="verticalSeparator2" />
          <div>
            <h1 id="titre4">D/ Création personnage</h1>
            <p>Créer l'histoire de ton personnage, que ça soit tes liens familiaux, tes amis, expériences. Une
              personnalité
              bien distincte, avec ses peurs et ses connaissances. Cela vous permettra de rendre votre plus vivant et
              ainsi
              de mieux vous plonger dans l'univers </p>
            <br>
            <h1 id="titre5">E/ Social</h1>
            <p>Contenu</p>
            <br>
            <h1 id="titre6">F/ Objets</h1>
            <p>Contenu</p>
            <br>
            <h1 id="titre7">G/ Combats</h1>
            <p>Contenu</p>
            <br>
            <h1 id="titre8">H/ Corruption</h1>
            <p>Échelle de Corruption </p>
            <p>Dépendant de la classe</p>
            <p>Confusion, irritabilité Roleplay - Maniement instinctif : Permet le maniement d'une arme d'une façon
              “instinctive” voir quasi parfaite mais il se ferai davantage corrompu (ex:-1 santé mental)</p>
            <p>Augmente une stat de +X jusqu'à la fin de l'évènement - Malus de Classe 1</p>
            <p>Serviteur de l'ombre - Malus Social </p>
            <p>Arrêt du temps 1mn - Malus de Classe 2</p>
            <p>Appel au dieu du chaos : liste de sorts interdits - Devient Corrompu / Monstre</p>
            <p>Pour descendre d'1 niveau de corruption, X repos avec X=niveau de corruption actuel </p>
            <br>
            <h1 id="titre9">I/ Expérience</h1>
            <p>Contenu</p>
            <br>
            <h1 id="titre10">J/ Glossaire</h1>
            <p>Contenu</p>
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
  transform: rotate(90deg) translate(8vw, 7vw);
  margin-top: 2vw;
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
  transform: rotate(90deg) translate(-9vw, -7vw);
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

/*.examples {
  background-image: url("../assets/exemple_back_purple.svg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100%;
  display: inline-block;
  padding: 5vw 10vw;
  transform: translateX(-10vw);
  margin-top: 1vw;
  margin-bottom: 1vw;
}*/

/*.example {
  margin-top: 1vw;
  margin-bottom: 1vw;
  width: 100%;
  background-color: #8B6FA7;
  height: 30vw;
  clip-path: shape(from 2vw 5vw,
      curve to 13vw 0vw with 8vw 0vw,
      hline by 1vw,
      curve to 48vw 5vw with 33vw 0vw / 41vw 5vw,
      curve to 54vw 4vw with 50vw 4.9vw / 53vw 4vw,
      curve to 58vw 7vw with 56.5vw 4vw / 57.5vw 4.5vw,
      vline by 20vw,
      curve to 54vw 30vw with 58vw 28vw / 56vw 30vw,
      hline by -49vw,
      curve to 0vw 13vw with 0.1vw 29.5vw,
      curve to 2vw 5vw with 0.1vw 7vw / 1.6vw 5.5vw,
      close);
  clip-path: path('M 0 150 C 9 -171 291 141 426 45 C 468 33 466 65 468 78 L 468 255 C 465 273 471 288 441 294 L 30 300 C 0 297 6 285 0 168 Z');
  transform: translateX(-2vw);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}*/

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

  /*.example {
    margin-top: 1vw;
    margin-bottom: 1vw;
    width: 100%;
    background-color: #8B6FA7;
    height: fit-content;
    clip-path: shape(from 2vw 5vw,
        curve to 13vw 0vw with 8vw 0vw,
        hline by 1vw,
        curve to 48vw 5vw with 33vw 0vw / 41vw 5vw,
        curve to 54vw 4vw with 50vw 4.9vw / 53vw 4vw,
        curve to 58vw 7vw with 56.5vw 4vw / 57.5vw 4.5vw,
        vline by 80vw,
        curve to 54vw 30vw with 58vw 28vw / 56vw 30vw,
        hline by -49vw,
        curve to 0vw 13vw with 0.1vw 29.5vw,
        curve to 2vw 5vw with 0.1vw 7vw / 1.6vw 5.5vw,
        close);
    clip-path: path('M 0 150 C 9 -171 291 141 426 45 C 468 33 466 65 468 78 L 468 255 C 465 273 471 288 441 294 L 30 300 C 0 297 6 285 0 168 Z');
    transform: translateX(-2vw);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 30vw;
    overflow: hidden;
  }
  */
  .example-content {
    padding-top: 17vw;
  }
}

.example-content>* {
  color: #000000;
}
</style>
