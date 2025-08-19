<script lang="ts">
    import { motivationalQuotes } from "@/utils";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Heart, Trophy, Sparkles } from "@lucide/svelte"
    import ChallengeDay from "@/ChallengeDay.svelte";
    import Progress from "@/Progress.svelte";
    import { onMount } from "svelte";
    import { challengeData } from "@/data";
    import Confetti from "@/Confetti.svelte";

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

    let completedDays: Set<number> = $state(new Set());
    let currentDay = $state(1);

    let progressPercentage = $derived((completedDays.size / 30) * 100);
    let todayQuote = $derived(motivationalQuotes[currentDay % motivationalQuotes.length]);
    let showConfetti = $state(false);

    $effect(() => {
        if (progressPercentage === 100) {
            showConfetti = true;
        } else {
            showConfetti = false;
        }
    });

    onMount(() => {
        const saved = localStorage.getItem("mental-health-progress");
        if (saved) completedDays = new Set(JSON.parse(saved));

        const savedCurrentDay = localStorage.getItem("mental-health-current-day");
        if (savedCurrentDay) currentDay = Number.parseInt(savedCurrentDay);
    });

    function toggleDay(day: number) {
        const newCompleted = new Set(completedDays);

        if (newCompleted.has(day)) {
            newCompleted.delete(day);
        } else {
            newCompleted.add(day);
        }

        completedDays = newCompleted;
        localStorage.setItem("mental-health-progress", JSON.stringify([...newCompleted]));
    }
</script>

<svelte:head>
    <title>30 Day Mental Health Challenge | AskDani</title>
</svelte:head>

<Confetti bind:show={showConfetti} />

<div class="min-h-screen bg-background">
    <header class="bg-card border-b border-border">
    <div class="max-w-6xl mx-auto px-4 py-6">
        <div class="flex items-center gap-3 mb-4">
        <Heart class="h-8 w-8 text-primary" />
        <h1 class="text-3xl font-bold text-foreground">30-Day Mental Health Challenge by: AskDani</h1>
        </div>
        <p class="text-muted-foreground text-lg leading-relaxed max-w-2xl">
        Transform your wellbeing with daily practices designed to support your mental health journey. Each day
        brings a new opportunity for growth, self-care, and connection. <a href="https://myqrcode.mobi/66440c2e" target="_blank" class="underline">Additional Works Cited</a>
        </p>
    </div>
    </header>

    <div class="max-w-6xl mx-auto px-4 py-8">
    <Card.Root class="mb-8">
        <Card.Header>
        <div class="flex items-center justify-between">
            <div>
            <Card.Title class="flex items-center gap-2">
                <Trophy class="h-5 w-5 text-primary" />
                Your Progress
            </Card.Title>
            <Card.Description>{completedDays.size} of 30 days completed</Card.Description>
            </div>
            <div class="text-right">
            <div class="text-2xl font-bold text-primary">{Math.round(progressPercentage)}%</div>
            <div class="text-sm text-muted-foreground">Complete</div>
            </div>
        </div>
        </Card.Header>
        <Card.Content>
        <Progress value={progressPercentage} className="h-3 mb-4" />
        <div class="bg-muted/50 p-4 rounded-lg">
            <div class="flex items-center gap-2 mb-2">
            <Sparkles class="h-4 w-4 text-accent" />
            <span class="font-medium text-sm">Daily Motivation</span>
            </div>
            <p class="text-foreground italic">{todayQuote}</p>
        </div>
        </Card.Content>
    </Card.Root>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each challengeData as challenge (`challengestuff${challenge.day}`)}
            <ChallengeDay {challenge} {completedDays} {currentDay} toggleDay={toggleDay} {categoryColors} />
        {/each}
    </div>

    <footer class="mt-16 text-center py-8 border-t border-border">
        <div class="max-w-2xl mx-auto">
        <h3 class="text-lg font-semibold mb-4 text-foreground">Remember: Your Mental Health Matters</h3>
        <p class="text-muted-foreground text-sm leading-relaxed mb-4">
            This challenge is designed to support your wellness journey. If you're experiencing a mental health
            crisis, please reach out to a mental health professional or crisis hotline immediately.
        </p>
        <div class="flex flex-wrap justify-center gap-4 text-sm">
            <a href="tel:988" class="text-primary hover:text-primary/80 underline">
            Crisis Lifeline: 988
            </a>
            <a href="tel:360-992-2614" class="text-primary hover:text-primary/80 underline">
            Student Services: 360-992-2614
            </a>
        </div>
        </div>
    </footer>
    </div>
</div>