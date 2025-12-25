<script lang="ts">
  import type { Attachment } from "svelte/attachments";
  import Model from "./Model.svelte";

  let id = $state(window.location.hash.slice(1));

  let time = $state(0);
  let xrot = $derived(Math.sin(time));
  let yrot = $derived(Math.cos(time));

  let brightness = $derived.by(() => {
    const wrapped = Math.abs(((time/Math.PI*2)+3)%4-2)*2-1;

    return Math.sin(time+(Math.PI/8))
  });
</script>

<div class="card">
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="inner" {@attach (elem) => {
    // elem.style.transform = `rotateX(${xrot*20}deg) rotateY(${yrot*20}deg)`;
    elem.style.transform = `rotate3d(${xrot}, ${yrot}, 0, 20deg)`
    elem.style.filter = `brightness(${brightness*0.15+1})`;
    
    setTimeout(() => {
      time += 0.01;
    }, 10);
  }}>
    <h1>Merry Christmas!</h1>
    {#if id == 1}
      <p>
        You all know why you're getting this...
      </p>
    {/if}
    {#if id == 2}
      <p>
        This whole idea was absolutely ridiculous. Have a virtual egg to remember it by.
      </p>
    {/if}
    {#if id == 3}
      <p>
        Have an eggcelent Christmas!
      </p>
    {/if}
    {#if id == 4}
      <p>
        Thanks for joining in the fun!
      </p>
    {/if}
    {#if id == 5}
      <p>
        ♫ ...four carabiners, three sources of light, two leather gloves, and a Nalgene bottle full of carbide. ♫
      </p>
    {/if}
    {#if id == 6}
      <p>
        You both know why you're getting this...
      </p>
    {/if}
    {#if id == 7}
      <p>
        You're going to need quite a few of these.
      </p>
    {/if}
    {#if id == 8}
      <p>
        I hope you have a wonderful Christmas!
      </p>
    {/if}
  </div>
  <div class="obj">
    <Model xrot={xrot} yrot={yrot} />
  </div>
</div>

<style>
  .card {
    position: relative;
    perspective: 12in;
    width: 100%;

    height: 90%;
  }

  .inner {
    box-sizing: content-box;
    position: absolute;

    height: 100%;
    width: 100%;

    background-color: rgb(64, 77, 92);
    border-radius: 2rem;
    
    box-shadow: rgba(0, 0, 0, 0.5) 1rem 1rem;
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    /* transition: transform 0.25s cubic-bezier(0.39, 0.575, 0.565, 1); */
  }

  .obj {
    position: absolute;
    height: 100%;
    width: 100%;
  }

  h1 {
    margin-top: 1.5rem;
  }

  p {
    padding: 5px;
  }
</style>
