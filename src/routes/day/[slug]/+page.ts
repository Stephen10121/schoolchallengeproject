import { challengeData } from '@/data';
import { redirect } from '@sveltejs/kit'

export function load({ params }) {
    if (parseInt(params.slug) > 30 || parseInt(params.slug) < 1) return redirect(308, "/");
    
    let challenge = challengeData.find((c) => c.day === parseInt(params.slug)) || challengeData[0]
    return {
        dayNumber: params.slug,
        challenge
    }
}