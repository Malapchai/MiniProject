<script>
    import { navigate } from 'svelte-routing';

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

    // Function to handle navigation to the blog detail page
    function readArticle(blogId) {
        navigate(`/blog/${blogId}`);
    }
</script>

<section class="blog-section">
    <div class="blog-header">
        <h2 class="blog-title">BLOG</h2>
        <a href="/blogs" class="more-stories-btn">More Stories</a>
    </div>

    <div class="blog-container">
        {#each blogs as blog}
            <div class="blog-card">
                <img src={blog.image} alt={blog.title} class="blog-image" />
                <div class="blog-content">
                    <p class="blog-date">{blog.date}</p>
                    <h3 class="blog-title">{blog.title}</h3>
                </div>
                <button class="read-article-btn" on:click={() => readArticle(blog.id)}>Read Article</button>
            </div>
        {/each}
    </div>
</section>

<style>
	/* Blog section container */
.blog-section {
    padding: 4rem 0;
    color: white;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
}

/* Blog section header */
.blog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

/* Blog section title */
.blog-title {
    font-size: 3rem;
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    color: #ffffff;
}

/* Blog cards container */
.blog-container {
    display: flex;
    gap: 2rem;
    justify-content: space-between;
    flex-wrap: wrap;
}

/* Blog card styling */
.blog-card {
    background-color: #111;
    border-radius: 8px;
    color: white;
    width: 45%;
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* Ensures button aligns at the bottom */
    padding: 1rem;
    position: relative;
    text-align: left; /* Ensures all text inside the card is aligned to the left */
}

/* Blog image styling */
.blog-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
}

/* Blog content */
.blog-content {
    padding-top: 1rem;
    flex-grow: 1; /* Takes up available space */
    text-align: left; /* Aligns all text within content to the left */
}

/* Date styling */
.blog-date {
    color: rgba(176, 255, 91, 0.817);
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    text-align: left; /* Ensures date text aligns to the left */
}

/* Blog title styling */
h3.blog-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    text-align: left; /* Aligns the title to the left */
}

/* Read article button styling */
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
    align-self: flex-start; /* Aligns button to the start */
    margin-top: auto; /* Pushes button to the bottom */
}

.read-article-btn:hover {
    background-color: #DBF77E;
    color: black;
}

/* More stories button styling */
.more-stories-btn {
    background-color: #000;
    color: #DBF77E;
    text-decoration: none;
    font-size: 1rem;
    border: 1px solid #DBF77E;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.more-stories-btn:hover {
    background-color: #DBF77E;
    color: black;
}
</style>
