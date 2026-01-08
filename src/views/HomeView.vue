<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com/">
  <link href="https://fonts.googleapis.com/css2?family=Kavoon&display=swap" rel="stylesheet">

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
  
  .divMignon {
    clear: both;
    
    /*background-image: url("../assets/fond_mignon.png");*/
    background-size: 100%;
    width: 100%;
    height: 230vw;
  }

  #starBG {
    transform: translate(25vw, 50vw);
    width: 25vw;
    height: 25vw;
  }
</style>