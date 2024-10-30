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
        <a href="/blogs" class="more-stories-btn">More Stories</a> <!-- Updated to go to the blog list page -->
    </div>

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
	/* Blog section container */
	.blog-section {
	padding: 4rem 0; /* Adds 2rem space above and below */
	color: white;
	max-width: 1200px;
	margin: 0 auto;
	text-align: center; /* Ensures all text is centered */
}


	/* Blog section header container */
	.blog-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
	}

	/* Blog section title */
	.blog-title {
		font-size: 2rem;
		font-family: 'Montserrat', sans-serif;
		font-weight: 700;
		color: #DBF77E;
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
		padding: 1rem;
		border-radius: 8px;
		color: white;
		width: 45%;
		position: relative;
		text-align: left;
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
	}

	/* Date styling */
	.blog-date {
		color: rgba(176, 255, 91, 0.817);
		font-size: 0.9rem;
		margin-bottom: 0.5rem;
	}

	/* Blog title styling */
	h3 {
		font-family: 'Montserrat', sans-serif;
		font-weight: 600;
		font-size: 1.2rem;
		margin-bottom: 4rem;
	}

	/* Read article button styling */
	.read-article-btn {
		background: none;
		color: #DBF77E;
		border: 2px solid #DBF77E; /* Add border */
		border-radius: 4px;
		font-family: 'Montserrat', sans-serif;
		padding: 0.5rem 1rem;
		cursor: pointer;
		transition: background-color 0.3s ease, color 0.3s ease;
		font-size: 0.9rem;
		position: relative;
		left: 0; /* Align to the left */
	}

	.read-article-btn:hover {
		background-color: #DBF77E;
		color: black;
	}

	/* More stories button */
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
