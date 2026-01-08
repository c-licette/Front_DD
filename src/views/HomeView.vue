<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com/">
  <link href="https://fonts.googleapis.com/css2?family=Kavoon&display=swap" rel="stylesheet">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Karma:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Creepster&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Karma:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <div class="about">
    <div class="title">
      <div class="divTitle">
        <img id="imgElfe" src="../assets/elfe.png">
        <h1 class="mainTitleD">D</h1>
      </div>
      <div class="divTitle">
        <div>
          <h1 class="mainTitle1">amned</h1>
        </div>
        <div>
          <h2 class="mainTitle2">olls</h2>
        </div>
      </div>
    </div>
    <div class="divMignon">
      <img id="starBG" src="../assets/star_bg.png">
      <img id="character" src="../assets/character.png">

      <div class="progressDiv">
        <div class="progress-bar">
          <div class="progress statBar" style="width:30%"></div>
          <p class="progress-text">Text</p>
        </div>
        <br>
        <div class="progress-bar">
          <div class="progress statBar" style="width:50%"></div>
          <p class="progress-text">Text</p>
        </div>
        <br>
        <div class="progress-bar">
          <div class="progress statBar" style="width:70%"></div>
          <p class="progress-text">Text</p>
        </div>
        <br>
        <div class="progress-bar">
          <div class="progress statBar" style="width:10%"></div>
          <p class="progress-text">Text</p>
        </div>
      </div>
      <div class="rectBackground">
        <input type="image" id="leftArrow" src="src/assets/left_arrow.png" alt="Previous"/>
        <p class="charaName">Bibou</p>
        <p class="charaDesc">Ce perso est bcp trop chou oulala</p>
        <input type="image" id="rightArrow" src="src/assets/right_arrow.png" alt="Next"/>
      </div>
      <button class="buttonCustomize">Personnaliser</button>
    </div>
    <div class="divSombre">
      <div class="monster-icon-back">
        <img class="monster-icon" src="../assets/monster.png"/>
      </div>
      <div class="monster-background" src="../assets/monster_back.png">
        <input type="image" id="leftArrowMonster" src="src/assets/left_arrow_monster.png" alt="Previous"/>
        <div class="monsterNameBack">
          <p class="monsterName">Golgoth</p>
        </div>
        <p class="monsterDesc">Né de la corruption, Golgoth se nourrit de la peur de nos héros.</p>
        <input type="image" id="rightArrowMonster" src="src/assets/right_arrow_monster.png" alt="Next"/>
      </div>
      <form action="/bestiaire">
        <input type="image" id="buttonBestiary" src="src/assets/button_bestiary.png" alt="Bestiaire"/>
      </form>
    </div>
    <div class="divAdventure">
      <form action="/joueur/creation">
        <button class="buttonAdventure" type="submit">Commencer l'aventure</button>
      </form>
    </div>
  </div>
</template>

<style scoped>

  @font-face {
    font-family: "Genki Desu";
    src: url("../assets/fonts/Genki_Desu_DEMO.otf") format("opentype");
  }

  .title {
    display: flex;
    justify-content: center;
  }

  .mainTitle1 {
    font-family: "Genki Desu", serif;
    font-size: 12.5vw;
    color: #D86C9D;
    margin-top: 2.6vw;
    text-shadow: 0.5vw 0vw #FFFFFF;
    
  }

  .mainTitle2 {
    font-family: "Genki Desu", serif;
    font-size: 12.5vw;
    color: #A488E1;
    line-height: 1vw;
    text-shadow: 0.5vw 0vw #FFFFFF;
  }

  .mainTitleD {
    font-family: "Genki Desu", serif;
    font-size: 25vw;
    color: #A488E1;
    text-shadow: 1vw 0vw #FFFFFF;
  }

  .about {
    margin: auto;
    width: 100%;
  }

  .divTitle {
    float: left;
  }

  #imgElfe {
    width: 15vw;
    height: 10vw;
    position: absolute;
    transform: translate(-2vw, 1.7vw);
  }

  .progressDiv {
    position: absolute;
    transform: translate(65vw, 20vw);
  }
  
  .divMignon {
    clear: both;
    position: relative;
    /*background-image: url("../assets/fond_mignon.png");*/
    /*background-size: 100%;*/
    width: 100%;
    height: 70vw;
    margin-top: 20vw;
  }

  #starBG {
    position: relative;
    transform: translate(25vw, 40vw);
    width: 25vw;
    height: 25vw;
    z-index: 49;
    pointer-events: none;
  }

  #character {
    position: relative;
    transform: rotate(5deg) translate(4vw, 42vw); 
    width: 23vw;
    height: 25vw;
    z-index: 50;
    pointer-events: none;
  }

  .rectBackground {
    position: relative;
    background-color: #FFEFBB;
    width: 50vw;
    height: 10vw;
    margin: 0 auto;
    transform: translateY(35vw);
    border-radius: 2vw;
    z-index: 48;
  }

  .charaName {
    text-align: end;
    font-family: "Kavoon", serif;
    margin-right: 3vw;
    padding-top: 1vw;
    font-size: 2vw;
  }

  .charaDesc {
    text-align: end;
    margin-right: 7vw;
    padding-top: 1vw;
    font-family: "Kdam Thmor", serif;
    font-size: 1.5vw;
  }

  #leftArrow {
    position: relative;
    float: left;
    transform: translate(-3.5vw, 2vw);
    width: 6vw;
    height: 6vw;
    z-index: 52;
  }

  #rightArrow {
    position: relative;
    float: right;
    transform: translate(3.5vw, -5.5vw);
    width: 6vw;
    height: 6vw;
    z-index: 52;
  }

  .divSombre {
    clear: both;
    width: 100%;
    height: 75vw;
    margin-top: 25vw; 
  }

  /*.statBar {
    -webkit-appearance: none;
    position: relative;
    margin-top: 2vw;
  }

  .statBar::-webkit-progress-bar {
    background-color: #FFEFBB;
    width: 15vw;
    height: 1vw
  }

  .statBar::-webkit-progress-value {
    background-color: #FBCEB7;
  }

  .statBar::before{
    position: absolute;
    content: "test";
    top: 0;
    left: 0;
    display: flex;
    color: black;
    align-items: center;
    justify-content: flex-end;
  }*/

  .progress-bar {
    width: 20vw;
    height: 1.5vw;
    background-color: #FFEFBB;
    border-radius: 0.5vw;
    position: relative;
  }

  @media (max-width: 768px){
    .progress-bar {
      margin-top: -4vw;
    }
  }

  .progress {
    height: 100%;
    border-radius: 0.5vw;
    background-color: #FBCEB7;
    width: 0%;
    position: relative;
  }

  .progress-text{
    position: absolute;
    font-family: "Kavoon", serif;
    font-size: 0.8vw;
    left: 1vw;
    right: 0;
    top: 0.1vw;
    bottom: 0;
    margin: auto;
  }

  .buttonCustomize {
    position: relative;
    transform: translate(30vw, 36vw);
    background-color: #FBCEB7;
    border: none;
    border-radius: 1vw;
    width: 12vw;
    height: 1.5vw;
    font-family: "Kavoon", serif;
    font-size: 0.8vw;
  }

  .monster-background {
    background-image: url("../assets/monster_back.png");
    height: 26vw;
    width: 50vw;
    margin: 0 auto;
    background-size: 100%;
    transform: translateY(32vw) rotate(-13deg);
    opacity: 90%;
    z-index: 25;
  }

  .monsterName {
    position: relative;
    letter-spacing: 0.5vw;
    font-size: 3vw;
    font-family: "Creepster", serif;
    color: white;
    width: 25vw;
  }

  .monsterDesc {
    position: relative;
    transform: translate(14vw, 11vw) rotate(13deg);
    font-size: 1.5vw;
    font-family: "Karma", serif;
    color: black;
    width: 25vw;
  }

  .monster-icon-back {
    position: absolute;
    transform: translate(67vw, 17vw);
    width: 20vw;
    height: 20vw;
    background-image: url("../assets/monster_icon_back.png");
    background-size: 100%;
    z-index: 26;
  }

  .monster-icon {
    transform: translate(-0.5vw, 4vw);
    width: 17vw;
    height: 17vw;
  }

  #leftArrowMonster {
    position: absolute;
    float: left;
    transform: translate(-5.5vw, 2vw) rotate(13deg);
    width: 8vw;
    height: 8vw;
    z-index: 52;
  }

  #rightArrowMonster {
    position: absolute;
    float: right;
    transform: translate(47vw, 8.5vw) rotate(13deg);
    width: 8vw;
    height: 8vw;
    z-index: 52;
  }

  #buttonBestiary {
    transform: translate(59vw, 30vw);
    width: 20vw;

  }

  .monsterNameBack {
    position: absolute;
    text-align: center;
    background-image: url("../assets/monster_name_back.png");
    transform: translate(6vw, 3vw) rotate(13deg);
    background-size: 100%;
    width: 25vw;
    height: 7vw;
    z-index: 50;
  }

  .divAdventure {
    margin-top: 15vw;
    margin-bottom: 10vw;
    width: 100%;
    text-align: center;
  }

  .buttonAdventure {
    margin: auto;
    width: 40vw;
    height: 5vw;
    border-radius: 2vw;
    font-size: 1.5vw;
    font-family: "Kavoon", serif;
    border: none;
    color: #500500;
  }
</style>

<script lang="ts">
export default {
  mounted() {
    document.documentElement.style.setProperty('--color-background', 'black');
    document.documentElement.style.setProperty('--image-background', 'url("/src/assets/background.png")');
  }
}
</script>