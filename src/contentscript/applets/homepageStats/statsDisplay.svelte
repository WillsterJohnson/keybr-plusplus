<script lang="ts">
  export let stats: { day: string; all: string } | undefined;

  let show: "day" | "all" = "day";
</script>

<div class="statbox">
  <div>
    <button on:click={() => (show = show === "day" ? "all" : "day")}>
      {show === "day" ? "Today" : "All time"}
    </button>
  </div>
  {@html stats?.[show] ?? "Loading stats..."}
</div>

<style lang="scss">
  button {
    background-color: var(--Button__background-color);
    border: none;
    color: var(--Button__color);
    cursor: pointer;
    display: inline-block;
    font-family: var(--default-font-family);
    font-size: 0.85rem;
    padding: 0 1.5rem;
    height: 2rem;
    line-height: 2rem;
    width: 7rem;
  }

  .statbox {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-inline: 1rem;
    padding-block-start: 1.5rem;
  }

  * > :global(p > span) {
    flex: initial;
  }
</style>
