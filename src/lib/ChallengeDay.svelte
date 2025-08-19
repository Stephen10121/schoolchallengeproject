<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { CircleCheck, Circle, Calendar } from "@lucide/svelte";
    import type { ChallengeDayType } from "./utils";

    let {
        challenge,
        completedDays,
        currentDay,
        toggleDay,
        categoryColors
    }: {
        challenge: ChallengeDayType,
        completedDays: Set<number>,
        currentDay: number,
        toggleDay: (day: number) => unknown,
        categoryColors: {[key: string]: string}
    } = $props();

    let isCompleted = $derived(completedDays.has(challenge.day));
    let isToday = $derived(challenge.day === currentDay);
</script>

<Card.Root class="flex justify-between transition-all duration-200 hover:shadow-lg {isCompleted ? "bg-accent/5 border-accent" : ""} {isToday ? "ring-2 ring-primary/50" : ""}">
    <Card.Header class="pb-3">
        <div class="flex items-start justify-between">
            <div class="flex items-center gap-2">
                <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                    {challenge.day}
                </div>
                {#if isToday}
                    <Badge variant="secondary" class="text-xs">
                        <Calendar class="h-3 w-3 mr-1" />
                        Today
                    </Badge>
                {/if}
            </div>
            <Button variant="ghost" size="sm" onclick={() => toggleDay(challenge.day)} class="p-1 h-auto">
                {#if isCompleted}
                    <CircleCheck class="h-5 w-5 text-chart-4" />
                {:else}
                    <Circle class="h-5 w-5 text-muted-foreground" />
                {/if}
            </Button>
        </div>
        <Card.Title class="text-lg leading-tight">{challenge.title}</Card.Title>
        <Badge variant="outline" class={`w-fit text-xs ${categoryColors[challenge.category as keyof typeof categoryColors]}`}>{challenge.category.replace("-", " ")}</Badge>
    </Card.Header>
    <Card.Content class="pt-0">
        <div class="flex flex-col justify-items-start">
            <Card.Description class="text-sm leading-relaxed mb-3">{challenge.description}</Card.Description>
    
            {#if challenge.fact}
                <div class="bg-muted/30 p-3 rounded-md">
                    <p class="text-xs text-muted-foreground">
                    <strong>Fact:</strong> {challenge.fact.text} <a class="underline" href={challenge.fact.source} target="_blank">Source</a>
                    </p>
                </div>
            {/if}
    
            <div class="mt-3">
                <a
                    href={challenge.link}
                    rel="noopener noreferrer"
                    class="text-primary hover:text-primary/80 text-sm underline"
                >Learn More →</a>
            </div>
        </div>

        <Button
            onclick={() => toggleDay(challenge.day)}
            variant={isCompleted ? "secondary" : "default"}
            size="sm"
            class="w-full mt-1"
        >
            {isCompleted ? "Completed ✓" : "Mark Complete"}
        </Button>
    </Card.Content>
</Card.Root>