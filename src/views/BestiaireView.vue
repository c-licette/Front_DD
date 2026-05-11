<template>
  <body class="background">
    <div class="about">
      <h1>Le Bestiaire</h1>
    </div>
  </body>
</template>


<style scoped>

.h1 {
  font-size: 3vw;
  color: #D4D3D2;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1; /* Elle passe derrière tout le contenu */

  background-image: url('../assets/background_bestiaire.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}



</style>
