<template lang="html">
  <div id="plaque-home">
    <h3>Blue Plaque Adventure!</h3>
    <p>
      You may have noticed plaques without realizing what they are.
    </p>
    <p>
      Our app takes you on a historic adventure through Glasgow discovering all the plaques, not just the blue ones.
    </p>
    <p>
      If you notice a plaque that is not on the map, just <b>double click</b> to add a new location, fill in the details in the form and voil&agrave;, a new entry has been made!
    </p>
    <p>
      We have used the amazing database of <a href="https://openplaques.org/">Open Plaques</a> which is a community-based project made up of volunteers who go out and about to discover, curate and catalogue commemorative plaques and historical markers throughout the world.
    </p>
    <h4>
      What is a plaque? Why are they placed where they are?
    </h4>
    <p>
      Well, a plaque is a sign that is installed in a public place to commemorate a historical connection between that location, a significant event or a famous person. It is a marker of history! You can put up a site for plaque nomination in Scotland through <a href="https://www.historicenvironment.scot/about-us/what-we-do/commemorative-plaque-scheme/#overview_tab">Historic Environment Scotland</a>. You can't nominate yourself though, one of the criteria is that you have to be dead for at least 20 years!
    </p>


    <p class="p-blue">
      Time to Explore!
    </p>

  </p>
</div>
</template>

<script>
export default {
  name: 'plaque-home'
}
</script>

<style lang="css" scoped>

h3, h4, .p-blue {
  color: #477CDE;
}
a {
  text-decoration: none;
  color: #477CDE;
}
a:hover {
  color: #FF903F;
}
#plaque-home{
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
