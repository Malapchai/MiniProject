<script>
    import { navigate } from 'svelte-routing';
    import NavBarLoggedIn from './NavBarLoggedIn.svelte'; // Import the NavBarLoggedIn component

    export let blogs = [
        {
            id: 1,
            date: 'November 2024',
            title: 'The Power of Retrogrades: Navigating Planetary Backtracks with Grace',
            image: './src/assets/Blog1.png'
        },
        {
            id: 2,
            date: 'November 2024',
            title: 'Natal Chart Readings',
            image: './src/assets/Blog2.png'
        }
    ];

    // Navigate to the specific blog article
    function readArticle(blogId) {
        navigate(`/blog/${blogId}`);
    }
</script>

<NavBarLoggedIn /> <!-- Include the NavBarLoggedIn component -->

<section class="blog-list">
    <h2 class="blog-title">All Blog Posts</h2>
    <div class="blog-container">
        {#each blogs as blog}
            <div class="blog-card">
                <img src={blog.image} alt={blog.title} class="blog-image" />
                <div class="blog-content">
                    <p class="blog-date">{blog.date}</p>
                    <h3>{blog.title}</h3>
                    <button class="read-article-btn" on:click={() => readArticle(blog.id)}>Read Article</button>
                </div>
            </div>
        {/each}
    </div>
</section>

<style>
    /* Blog page styles */
    .blog-list {
        padding: 4rem 0;
        color: white;
        max-width: 1200px;
        margin: 0 auto;
        text-align: center;
    }

    .blog-title {
        font-size: 2.5rem;
        font-family: 'Montserrat', sans-serif;
        font-weight: 700;
        color: #DBF77E;
        margin-bottom: 2rem;
    }

    .blog-container {
        display: flex;
        gap: 2rem;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .blog-card {
        background-color: #111;
        padding: 1rem;
        border-radius: 8px;
        color: white;
        width: 45%;
        position: relative;
        text-align: left;
        transition: transform 0.3s ease;
    }

    .blog-card:hover {
        transform: translateY(-5px);
    }

    .blog-image {
        width: 100%;
        height: auto;
        border-radius: 8px;
    }

    .blog-content {
        padding-top: 1rem;
    }

    .blog-date {
        color: rgba(176, 255, 91, 0.817);
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
    }

    h3 {
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
        font-size: 1.2rem;
        margin-bottom: 1rem;
    }

    .read-article-btn {
        background: none;
        color: #DBF77E;
        border: 2px solid #DBF77E;
        border-radius: 4px;
        font-family: 'Montserrat', sans-serif;
        padding: 0.5rem 1rem;
        cursor: pointer;
        transition: background-color 0.3s ease, color 0.3s ease;
        font-size: 0.9rem;
    }

    .read-article-btn:hover {
        background-color: #DBF77E;
        color: black;
    }
</style>