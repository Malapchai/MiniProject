<section class="membership">
	<div class="content">
		<h2>Join our <span class="highlight">membership</span> for daily bits of <span class="highlight">astrology</span></h2>
		<p>We provide the essentials for your astrology needs</p>
		<button class="join-btn">Join Membership</button>
	</div>
</section>

<style>
	.membership {
		background-image: url('src/assets/Mem1.png'); /* Replace with the correct path */
		background-size: cover;
		background-position: right center; /* Align background to the right */
		color: white;
		padding: 4rem; /* Increase padding for spacing */
		display: flex;
		justify-content: flex-end; /* Align content to the right */
		align-items: center;
		height: 450px; /* Adjust the height */
		position: relative;
	}

	.content {
		max-width: 600px;
		text-align: left; /* Align text to the left within the content block */
	}

	/* Heading Styling */
	h2 {
		font-family: 'Playfair Display', serif; /* Use Playfair Display for an elegant serif look */
		font-size: 2.5rem;
		margin-bottom: 1rem;
		line-height: 1.3;
	}

	/* Highlight for membership and astrology */
	.highlight {
		font-style: italic;
		color: #DBF77E;
	}

	/* Paragraph Styling */
	p {
		font-family: 'Merriweather', serif;
		font-size: 1.2rem;
		margin-bottom: 2rem;
		color: #f5f5f5;
	}

	/* Button Styling */
	.join-btn {
		background-color: #DBF77E;
		color: black;
		padding: 0.7rem 1.5rem;
		border-radius: 8px;
		font-size: 1rem;
		border: none;
		cursor: pointer;
		transition: background-color 0.3s ease, transform 0.3s ease;
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
		font-family: 'Montserrat', sans-serif;
	}

	.join-btn:hover {
		background-color: #C7E96B;
		transform: translateY(-2px);
		box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
	}

	/* Ensure background image covers the full section */
	.membership::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url('/path-to-your-background-image.png');
		background-size: cover;
		background-position: right center;
		opacity: 0.5;
		z-index: -1;
	}
</style>
