<template>
  <header>
    
    <div class="logo">
      <img src="@/assets/logo.png" alt="" >
    </div>
      <nav>
        <RouterLink to="#">Explorar</RouterLink>
        <RouterLink to="#">Playlists</RouterLink>
        <RouterLink to="#">Playlists</RouterLink>
      </nav>
  
  </header>

  <RouterView />
</template>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  justify-content: space-between ;
  background-color: #101A1A;
  height: 13vh;
  align-items: center;
  padding-left: 2vw;
  padding-right: 2vw;
}
nav{

}

.logo img{
  object-fit: contain;
  width: 200px;
height: 30px;
}
</style>
