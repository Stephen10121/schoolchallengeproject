<script lang="ts">
    import { Progress } from "$lib/components/ui/progress/index.js";
    import { cn } from "./utils";

    const { value, className }: { value: number, className: string } = $props();
</script>

<Progress {value} max={100} class={cn("relative h-2 w-full overflow-hidden rounded-full bg-secondary", className)} />