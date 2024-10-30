<script>
    import { onMount } from 'svelte';
    import NavBarLoggedIn from './NavBarLoggedIn.svelte';

    export let id; // Declaring the 'id' prop

    // Example blog data (could be fetched dynamically or passed as props)
    export let blogs = [
        {
            id: 1,
            date: 'November 2024',
            title: 'The Power of Retrogrades: Navigating Planetary Backtracks with Grace',
            image: '/src/assets/Blog1.png', // Ensure the path is correct
            content: '<p>This is some HTML content for Blog 1.</p>'
        },
        {
            id: 2,
            date: 'November 2024',
            title: 'Natal Chart Readings',
            image: '/src/assets/Blog2.png', // Ensure the path is correct
            content: '<p>This is some HTML content for Blog 2.</p>'
        }
    ];

    let blog;

    // Fetch the blog based on URL parameter
    onMount(() => {
        const blogId = Number(window.location.pathname.split('/')[2]); // Convert to a number
        blog = blogs.find((b) => b.id === blogId); // Finding the matching blog
    });
</script>

<NavBarLoggedIn />

{#if blog}
    <div class="blog-detail-page">
        <img src={blog.image} alt={blog.title} class="blog-header-image" />
        <div class="blog-content">
            <h1>{blog.title}</h1>
            <p class="blog-date">{blog.date}</p>
            <div class="blog-text">
                {@html blog.content} <!-- Render HTML content -->
            </div>
        </div>
    </div>
{/if}

<style>
    .blog-detail-page {
        background-color: black;
        padding: 2rem;
        color: white;
        min-height: 100vh;
    }

    .blog-header-image {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: 10px;
        margin-bottom: 2rem;
    }

    .blog-content {
        max-width: 800px;
        margin: 0 auto;
    }

    .blog-date {
        color: #dbf77e;
        font-size: 1rem;
        margin-bottom: 1rem;
    }

    h1 {
        font-size: 2.5rem;
        color: #dbf77e;
    }

    h2 {
        font-size: 1.8rem;
        color: #dbf77e;
        margin-top: 1.5rem;
    }

    .blog-text {
        font-size: 1.1rem;
        line-height: 1.6;
    }
</style>