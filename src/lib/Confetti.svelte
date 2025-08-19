<script lang="ts">
  import { Confetti } from "svelte-confetti";

  let { show = $bindable() }: { show: boolean } = $props();

  $effect(() => {
    if (show) {
        console.log("wows")
        setTimeout(() => {
            show = false;
        }, 10000);
    }
  });
</script>


{#if show}
    <div style="
        position: fixed;
        top: -50px;
        left: 0;
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        overflow: hidden;
        pointer-events: none;
        z-index:200;"
    >
        <Confetti x={[-5, 5]} y={[0, 0.1]} delay={[100, 2000]} infinite duration={5000} amount={500} fallDistance="100vh" />
    </div>
{/if}