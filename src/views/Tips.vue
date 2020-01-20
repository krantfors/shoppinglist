<template>
  <div>
    <Navbar/>
    <div class="tip">
      <h3>#1 - Det finns toapapper (lägg till platsen här!)</h3>
      <h3>#2 - Det finns pennor och suddigum mm i skåpet i entrén</h3>
      <h3>#3 - Mjölk kan även finnas i den andra kylen</h3>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar"

export default {
  components: {
    Navbar
  },


}
</script>



<style>
 .tip {
  margin-top: 60px;
  width: 280px;
  margin: auto;
  margin-top: 70px;
 }
</style>