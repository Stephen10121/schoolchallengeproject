<script lang="ts">
    import { Heart, CircleCheck, Circle, ArrowLeft, ArrowRight, House, Lightbulb, Archive } from "@lucide/svelte";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { onMount } from "svelte";

    const categoryColors = {
        awareness: "bg-chart-1/10 text-chart-1 border-chart-1/20",
        coping: "bg-chart-2/10 text-chart-2 border-chart-2/20",
        relaxation: "bg-accent/100 text-accent-foreground border-accent/20",
        reflection: "bg-secondary/70 text-secondary-foreground border-secondary/20",
        education: "bg-primary/10 text-chart-2 border-primary/20",
        creativity: "bg-chart-5/10 text-chart-5 border-chart-5/20",
        routine: "bg-chart-4/10 text-chart-4 border-chart-4/20",
        mindfulness: "bg-accent/10 text-chart-4 border-accent/20",
        community: "bg-chart-2/10 text-chart-2 border-chart-2/20",
        support: "bg-primary/10 text-chart-4 border-primary/20",
        "digital-detox": "bg-chart-3/10 text-chart-3 border-chart-3/20",
        physical: "bg-chart-1/10 text-chart-1 border-chart-1/20",
        "self-care": "bg-secondary/10 text-chart-4 border-secondary/20",
        growth: "bg-chart-5/10 text-chart-5 border-chart-5/20",
    };

    const { data } = $props();

    let dayNumber = $derived(Number.parseInt(data.dayNumber as string));
    let completedDays: Set<number> = $state(new Set());
    let isCompleted = $derived(completedDays.has(dayNumber));

    onMount(() => {
        const saved = localStorage.getItem("mental-health-progress")
        if (saved) completedDays = new Set(JSON.parse(saved));
    })

    function toggleDay(day: number) {
        const newCompleted = new Set(completedDays)
        if (newCompleted.has(day)) {
            newCompleted.delete(day)
        } else {
            newCompleted.add(day)
        }
        completedDays = newCompleted;
        localStorage.setItem("mental-health-progress", JSON.stringify([...newCompleted]))
    }
</script>

<svelte:head>
    <title>Day {data.dayNumber} | AskDani</title>
</svelte:head>


<div class="min-h-screen bg-background">
    <header class="bg-card border-b border-border">
        <div class="max-w-4xl mx-auto px-4 py-6">
            <div class="flex items-center justify-between mb-4">
                <Button variant="ghost" href="/" class="flex items-center gap-2">
                    <House class="h-4 w-4" />
                    Back to Overview
                </Button>

                <div class="items-center gap-2 hidden sm:flex">
                    <Button variant="outline" size="sm" href="/day/{dayNumber - 1}" disabled={dayNumber <= 1}>
                        <ArrowLeft class="h-4 w-4" />
                    </Button>
                    <span class="text-sm text-muted-foreground px-3">Day {dayNumber} of 30</span>
                    <Button variant="outline" size="sm" href="/day/{dayNumber + 1}" disabled={dayNumber >= 30}>
                        <ArrowRight class="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div class="flex items-center gap-3">
                <Heart class="h-8 w-8 text-primary" />
                <div>
                    <h1 class="text-3xl font-bold text-foreground">{data.challenge.title}</h1>
                    <p class="text-muted-foreground">Day {data.challenge.day} Challenge</p>
                </div>
            </div>
        </div>
    </header>

    <div class="max-w-4xl mx-auto px-4 py-8">
        <Card.Root class={`mb-8 ${isCompleted ? "bg-accent/5 border-accent" : ""}`}>
            <Card.Header>
                <Button
                    onclick={() => toggleDay(data.challenge.day)}
                    variant={isCompleted ? "secondary" : "default"}
                    size="lg"
                    class="flex sm:hidden items-center gap-2 mt-1"
                >
                    {#if isCompleted}
                        <CircleCheck class="h-5 w-5" />
                        Completed
                    {:else}
                        <Circle class="h-5 w-5" />
                        Mark Complete
                    {/if}
                </Button>
                <div class="mt-2 sm:mt-0 flex items-start justify-between">
                    <div class="flex items-center gap-3">
                        <div class="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-lg">
                            {data.challenge.day}
                        </div>
                        <div>
                            <Card.Title class="text-2xl mb-2">{data.challenge.title}</Card.Title>
                            <Badge variant="outline" class={`w-fit ${categoryColors[data.challenge.category as keyof typeof categoryColors]}`}>
                                {data.challenge.category.replace("-", " ")}
                            </Badge>
                        </div>
                    </div>

                    <Button
                        onclick={() => toggleDay(data.challenge.day)}
                        variant={isCompleted ? "secondary" : "default"}
                        size="lg"
                        class="hidden sm:flex items-center gap-2"
                    >
                        {#if isCompleted}
                            <CircleCheck class="h-5 w-5" />
                            Completed
                        {:else}
                            <Circle class="h-5 w-5" />
                            Mark Complete
                        {/if}
                    </Button>
                </div>
            </Card.Header>

            <Card.Content class="space-y-6">
                <div>
                    <h3 class="font-semibold mb-2">Summary</h3>
                    <p class="text-lg text-muted-foreground">{data.challenge.description}</p>
                </div>

                <div>
                    <h3 class="font-semibold mb-2">Description</h3>
                    <p class="text-muted-foreground leading-relaxed">{data.challenge.detailedDescription}</p>
                </div>

                <div>
                    <h3 class="font-semibold mb-3 flex items-center gap-2">
                        <Lightbulb class="h-4 w-4" />
                        Tips for Success
                    </h3>
                    <ul class="space-y-2">
                        {#each data.challenge.tips as tip, index (`tips${index}`)}
                            <li class="flex items-start gap-2">
                                <div class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                                <span class="text-muted-foreground">{tip}</span>
                            </li>
                        {/each}
                    </ul>
                </div>

                {#if data.challenge.resources.length > 0}
                    <div>
                        <h3 class="font-semibold mb-3 flex items-center gap-2">
                            <Archive class="h-4 w-4" />
                            Resources
                        </h3>
                        <ul class="space-y-2">
                            {#each data.challenge.resources as resource, index (`resources${index}`)}
                                <li class="flex items-start gap-2">
                                    <a class="resource text-muted-foreground underline" href={resource} target="_blank">{resource}</a>
                                </li>
                            {/each}
                        </ul>
                    </div>
                {/if}

                {#if data.challenge.fact}
                    <div class="bg-muted/30 p-4 rounded-lg">
                        <h3 class="font-semibold mb-2">Did You Know?</h3>
                        <p class="text-muted-foreground">{data.challenge.fact.text} <a class="underline" target="_blank" href={data.challenge.fact.source}>Source</a></p>
                    </div>
                {/if}
            </Card.Content>
        </Card.Root>

        <div class="flex justify-between items-center">
            <Button
                variant="outline"
                href="/day/{dayNumber - 1}"
                disabled={dayNumber <= 1}
                class="flex items-center gap-2"
            >
                <ArrowLeft class="h-4 w-4" />
                Previous Day
            </Button>

            <Button
                variant="outline"
                href="/day/{dayNumber + 1}"
                disabled={dayNumber >= 30}
                class="flex items-center gap-2"
            >
                Next Day
                <ArrowRight class="h-4 w-4" />
            </Button>
        </div>
    </div>
</div>

<style>
    .resource {
        width: 100%;
        white-space: pre-wrap; /* CSS3 */    
        white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
        white-space: -pre-wrap; /* Opera 4-6 */    
        white-space: -o-pre-wrap; /* Opera 7 */    
        word-wrap: break-word; /* Internet Explorer 5.5+ */
    }
</style>