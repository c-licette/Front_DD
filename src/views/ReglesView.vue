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
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link
    href="https://fonts.googleapis.com/css2?family=Creepster&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Karma:wght@300;400;500;600;700&family=Lexend+Exa:wght@100..900&display=swap"
    rel="stylesheet">

  <div class="title">
    <h1 ref="titreRef">Règles</h1>
  </div>
  <hr class="horizontalSeparator" />

  <div class="page" ref="contentRef">

    <div class="container">
      <div class="content" ref="contentRef">
        <h1 id="titre1">Règles générales</h1>
        <p>Contenu</p>

        <h1 id="titre2">Système de dés</h1>
        <p>Pour réaliser une action, le joueur peut faire appel à plusieurs types de caractéristiques et répartit en
          compétences du corps, de l'esprit et des interactions :</p><br>
        <li>Corps : Force / Dextérité / Technique / Résistance</li><br>
        <li>Esprit : Intuition / Savoir / Résilience</li><br>
        <li>Interaction : Communication / Discernement / Survie / Nature</li><br>
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
        </div><br>
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
            <h1 id="titre3">Caractéristiques</h1><br>
            <h2>Corps</h2><br>
              <p>Tout ce qui a trait au corps</p><br>
              <li>Force</li>
              <p>Puissance musculaire, capacité à infliger des dégâts à main nue</p>
              <p><i>Ex: taper sur un garde, casser une porte</i></p><br>
              <li>Dextérité</li>
              <p>Capacité à mouvoir son corps dans l’environnement</p>
              <p><i>Ex: faire un salto, esquiver, se déplacer sur un terrain difficile</i></p><br>
              <li>Technique</li>
              <p>Motricité fine, détails manuels</p>
              <p><i>Ex: nouer un noeud, crocheter une porte</i></p><br>
              <li>Résistance</li>
              <p>Capacité à encaisser des dégâts physiques sans le laisser paraître</p>
              <p><i>Ex: résister au poison, ne pas plier à la torture</i></p><br>

            <h2>Esprit</h2><br>
              <p>Tout ce qui à trait à l’esprit</p><br>
              <li>Intuition</li>
              <p>Capacité a observer et déduire des faits du monde autour</p>
              <p><i>Ex: trouver des pièges, comprendre un plan</i></p><br>
              <li>Savoir</li>
              <p>Accumulation des connaissances</p>
              <p><i>Ex: comprendre une langue, savoir faire une potion</i></p><br>
              <li>Résilience</li>
              <p>Capacité à encaisser des tensions mentales sans le laisser paraître</p>
              <p><i>Ex: résister a une manipulation, un sort mental</i></p><br>

            <h2>Monde</h2><br>
              <p>Interactions avec le monde</p><br>
              <li>Communication</li>
              <p>Capacité a comprendre et se faire comprendre d’autrui</p>
              <p><i>Ex: demander une direction, faire un discours</i></p><br>
              <li>Discernement</li>
              <p>Capacité a deviner les intentions et les secrets d’autrui</p>
              <p><i>Ex: identifier les opposants, comprendre le sous texte</i></p><br>
              <li>Survie</li>
              <p>Capacité à s’adapter a l’environnement</p>
              <p><i>Ex: allumer un feu, trouver le meilleur bar</i></p><br>
              <li>Nature</li>
              <p>Capacité à interagir avec la faune et la flore locale</p>
              <p><i>Ex: maintenir une plante en vie, calmer un ours</i></p><br>
      </div>
      <hr class="verticalSeparator" />
      <div class="sideContent">
        <p class="sideText first-color">Règles</p>
        <p class="sideSeparator first-color">·</p>
        <p class="sideText2 first-color">Règles</p>
      </div>
    </div>
    
    <br>
    <hr id="midPoint" class="horizontalSeparator" />
    <div class="container">
      <div class="sideContent2">
        <p class="sideText second-color">Règles</p>
        <p class="sideSeparator second-color">·</p>
        <p class="sideText2 second-color">Règles</p>
      </div>
      <div class="content" ref="contentRef">
        <div class="separatorExample">
          <hr class="verticalSeparator2" />
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
            <h1 id="titre4">Objets</h1>

            <br>
            <h1 id="titre5">Combats</h1>
            <p>Les combats se déroulent au tour à tour, divisé en “instants”. Ils sont ordonnées en phases:</p><br>
            <li>Initiative: chaque PJ annonce son niveau en Intuition, et le MJ construit l’ordre de passage. 
              Si 2 personnes sont à égalité, on fera un jet de dés. Les PNJ jouent en second.
            <ul>
              <li>En cas d’attaque surprise, l’ordre de passage est établi sur le Discernement, et les auteur-ices ont 1 mouvement et 2 actions.</li>
            </ul></li><br>
            <li>Mouvement: chaque tour, un personnage peut se déplacer de 7m (et voler de 7m pour celle-eux qui en ont la capacité)<ul>
            <li>Les terrains difficiles abaissent la distance de mouvement à 3m</li>
            </ul></li><br>
            <li>Action: chaque joueur peut utiliser son action comme iel le souhaite:
              <ul>
                <li>Attaquer</li>
                <li>Lancer un projectile</li>
                <li>Se déplacer de 7m max</li>
                <li>Lancer un sort</li>
                <li>Utiliser une arme</li>
                <li>Utiliser un objet magique</li>
              </ul>
            </li><br>
            <h1 id="titre6">Corruption</h1>
            <h2>Échelle de Corruption </h2><br>
            <p>Dépendant de la classe</p><br>
            <p>Confusion, irritabilité Roleplay - Maniement instinctif : Permet le maniement d'une arme d'une façon
              “instinctive” voir quasi parfaite mais il se ferai davantage corrompu (ex:-1 santé mental)</p><br>
            <p>Augmente une stat de +X jusqu'à la fin de l'évènement - Malus de Classe 1</p><br>
            <p>Serviteur de l'ombre - Malus Social </p><br>
            <p>Arrêt du temps 1mn - Malus de Classe 2</p><br>
            <p>Appel au dieu du chaos : liste de sorts interdits - Devient Corrompu / Monstre</p><br>
            <p>Pour descendre d'1 niveau de corruption, X repos avec X=niveau de corruption actuel </p>
            <br>
            <h1 id="titre7">Expérience</h1>
            <p>Contenu</p>
            <br>
            <h1 id="titre8">Glossaire</h1>
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
  transform: rotate(90deg) translate(5vw, 5vw);
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
  transform: rotate(90deg) translate(-5vw, -6.5vw);
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
