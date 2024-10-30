<script>
    import NavBarLoggedIn from './NavBarLoggedIn.svelte'; // Assuming you have a logged-in navbar
    // If you're not logged in, use NavBar instead
</script>

<NavBarLoggedIn />

<div class="about-page">
    <div class="about-content">
        <h1>Welcome to HOROSCAPE!</h1>
        <p>
            Your gateway to spiritual insights and mystical guidance. At HOROSCAPE, we believe that
            life's mysteries can be revealed through the ancient practices of Tarot reading and the
            art of fortune sticks. Our platform offers a space where you can explore these age-old
            methods to gain clarity, insight, and direction in your life.
        </p>

        <h2>Our Services</h2>
        <ul>
            <li>
                <b>Tarot Card Reading:</b> Dive deep into the symbolism of the Tarot to uncover the hidden
                messages in your love life, career, or personal growth. Our skilled Tarot Readers are
                here to provide you with personalized readings that resonate with your unique path.
            </li>
            <li>
                <b>Fortune Sticks (เซียมซี):</b> Looking for answers from a traditional perspective?
                Our fortune sticks readings bring the wisdom of ancient divination to guide your decisions
                and illuminate your future.
            </li>
            <li>
                <b>Member Exclusive:</b> By becoming a member of HOROSCAPE, you gain access to our live
                chat feature, allowing you to connect directly with our experienced Tarot Readers. Ask
                questions, seek advice, and enjoy in-depth conversations that cater to your personal
                concerns.
            </li>
        </ul>

        <h2>Our Mission</h2>
        <p>
            HOROSCAPE aims to blend modern technology with the wisdom of ancient spiritual
            practices. We provide a user-friendly platform where everyone, regardless of experience,
            can access the guidance they seek, whether through Tarot, fortune sticks, or personal
            consultation with our Tarot Readers.
        </p>
        <p>
            We are passionate about helping you find clarity, comfort, and direction in all aspects
            of life. Our trusted team of readers is dedicated to offering insightful and
            compassionate advice through every reading.
        </p>

        <h2>Join Us</h2>
        <p>
            Become a part of the HOROSCAPE community today and embark on a journey of self-discovery
            and enlightenment. Sign up for membership to unlock exclusive features and start
            chatting with your personal Tarot Reader.
        </p>
        <p>
            At HOROSCAPE, we’re here to guide you through the unknown, helping you navigate life’s
            ups and downs with confidence and clarity.
        </p>
    </div>
</div>

<style>
    /* Styles for About Us Page */
    .about-page {
        background-color: black;
        min-height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        overflow: hidden;
        padding: 2rem;
    }

    .about-page::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('/src/assets/silk2.png');
        background-size: cover;
        background-position: center;
        opacity: 0.4;
        z-index: 0;
    }

    .about-content {
        max-width: 800px;
        text-align: left;
        color: white;
        font-family: 'Cormorant', sans-serif;
        position: relative;
        z-index: 1;
        padding: 2rem;
        background: rgba(0, 0, 0, 0.8);
        border-radius: 15px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
        margin-bottom: 5rem; /* Add space below the text box */
    }

    h1 {
        font-size: 2.5rem;
        color: #dbf77e;
        font-family: 'Cormorant Bold', sans-serif;
        margin-bottom: 1.5rem;
    }

    h2 {
        font-size: 1.8rem;
        color: #dbf77e;
        font-family: 'Cormorant Bold', sans-serif;
        margin-top: 2rem;
        margin-bottom: 1rem;
    }

    p {
        font-size: 1.2rem;
        line-height: 1.8;
        margin-bottom: 1.5rem;
    }

    ul {
        margin-left: 1.5rem;
        list-style-type: disc;
    }

    li {
        margin-bottom: 1rem;
        font-size: 1.2rem;
        line-height: 1.8;
    }
</style>