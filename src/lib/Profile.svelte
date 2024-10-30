<script>
    import NavBarLoggedIn from './NavBarLoggedIn.svelte'; // Import the logged-in NavBar
    import { isAuthenticated } from 'C:\\Users\\User\\Pictures\\Document\\svelte-course\\src\\lib\\stores.js'; // Import store

    let userLoggedIn = false;
    let currentPage = 'profile'; // Tracks the active sidebar tab

    let userProfile = {
        username: "Malapchai001",
        birthdate: "01/02/2003",
        email: "malpp001@gmail.com",
        package: "HOROSCAPE Free",
    };

    // Subscribe to the authentication store
    $: {
        isAuthenticated.subscribe((value) => {
            userLoggedIn = value;
        });
    }

    // Function to handle membership application
    function applyForMembership() {
        alert("Membership application submitted!");
    }

    function changeTab(tab) {
        currentPage = tab; // Update the active tab
    }
</script>

<!-- Include the NavBarLoggedIn component -->
<NavBarLoggedIn />

<!-- Profile Page Layout -->
<div class="profile-page">
    <div class="sidebar">
        <!-- Sidebar Links -->
        <ul class="profile-links">
            <li>
                <a href="#" class={currentPage === 'profile' ? 'active' : ''} on:click={() => changeTab('profile')}>
                    Profile
                </a>
            </li>
            <li>
                <a href="#" class={currentPage === 'membership' ? 'active' : ''} on:click={() => changeTab('membership')}>
                    Membership
                </a>
            </li>
            <li>
                <a href="#" class={currentPage === 'history' ? 'active' : ''} on:click={() => changeTab('history')}>
                    History
                </a>
            </li>
        </ul>
    </div>

    <!-- Main Profile Section -->
    <div class="profile-container">
        {#if currentPage === 'profile'}
            <h2 class="profile-title">Profile</h2>
            <div class="profile-info">
                <div class="profile-field">
                    <label>Username :</label>
                    <div class="input-container">
                        <input type="text" value={userProfile.username} readonly />
                        <a href="#"><img src="/src/assets/edit.png" alt="edit" class="edit-icon" /></a>
                    </div>
                </div>

                <div class="profile-field">
                    <label>BirthDate :</label>
                    <div class="input-container">
                        <input type="text" value={userProfile.birthdate} readonly />
                        <a href="#"><img src="/src/assets/edit.png" alt="edit" class="edit-icon" /></a>
                    </div>
                </div>

                <div class="profile-field">
                    <label>Email :</label>
                    <div class="input-container">
                        <input type="text" value={userProfile.email} readonly />
                        <a href="#"><img src="/src/assets/edit.png" alt="edit" class="edit-icon" /></a>
                    </div>
                </div>

                <div class="profile-field">
                    <label>Package :</label>
                    <div class="input-container">
                        <input type="text" value={userProfile.package} readonly />
                    </div>
                </div>
            </div>
        {/if}

        <!-- Membership Section -->
        {#if currentPage === 'membership'}
            <div class="membership-section">
                <h2 class="membership-title">Membership</h2>
                <div class="membership-card">
                    <div class="new-member-badge">New Member</div>
                    <h3>HOROSCAPE Explorer</h3>
                    <p class="membership-tier">Premium Membership</p>
                    <p class="membership-price">$7.99/month</p>
                    <button class="subscribe-btn" on:click={applyForMembership}>Subscribe Now</button>
                </div>
            </div>
        {/if}

        <!-- History Section (To be developed) -->
        {#if currentPage === 'history'}
            <div class="history-section">
                <h2 class="history-title">History</h2>
                <!-- Future implementation for the history section goes here -->
                <p>History content is under development...</p>
            </div>
        {/if}
    </div>
</div>

<style>
    /* Profile Page Layout */
    .profile-page {
        display: flex;
        height: 100vh;
        background-color: black;
        background-image: url('/src/assets/silk2.png');
        background-size: cover;
        background-position: center;
    }

    /* Sidebar Styling */
    .sidebar {
        width: 25%;
        padding: 2rem;
        background-color: rgba(0, 0, 0, 0.7);
        border-right: 1px solid #dbf77e;
    }

    .profile-links {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    .profile-links li {
        margin-bottom: 2rem;
    }

    .profile-links a {
        color: #dbf77e;
        text-decoration: none;
        font-family: 'Montserrat', sans-serif;
        font-size: 1.2rem;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        transition: background-color 0.3s ease, color 0.3s ease;
        display: block;
    }

    /* Active Sidebar Tab */
    .profile-links a.active {
        background-color: #dbf77e;
        color: black;
    }

    .profile-links a:hover {
        color: black;
        background-color: #c7e96b;
    }

    .profile-container {
        width: 75%;
        padding: 2rem;
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        text-align: left;
        position: relative;
    }

    .profile-title,
    .membership-title,
    .history-title {
        font-size: 2.5rem;
        margin-bottom: 2rem;
        color: #dbf77e;
        text-align: center;
    }

    .profile-info {
        margin: 0 auto;
        max-width: 600px;
        display: grid;
        gap: 1.5rem;
        background-color: rgba(255, 255, 255, 0.1);
        padding: 2rem;
        border-radius: 15px;
    }

    .profile-field {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .profile-field label {
        font-size: 1.2rem;
        flex: 1;
        color: #dbf77e;
        text-align: left;
    }

    .input-container {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 70%;
    }

    .profile-field input {
        flex: 1;
        padding: 0.5rem;
        border-radius: 10px;
        border: none;
        background-color: rgba(255, 255, 255, 0.2);
        color: white;
        text-align: left;
        font-size: 1.2rem;
    }

    .edit-icon {
        width: 20px;
        cursor: pointer;
    }

    /* Membership Section */
    .membership-section {
        text-align: center;
        max-width: 600px;
        width: 100%;
        background: rgba(0, 0, 0, 0.6);
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        margin: 0 auto;
        position: relative;
    }

    /* Semi-transparent white background card */
    .white-background-card {
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translate(-50%, -10%);
        width: 90%;
        height: 400px;
        background-color: rgba(255, 255, 255, 0.6);
        border-radius: 15px;
        z-index: 1;
    }

    .membership-card {
        background: linear-gradient(135deg, #232323, #1a1a1a);
        border-radius: 15px;
        padding: 2rem;
        text-align: center;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
        position: relative;
        z-index: 2;
        margin-top: 2rem;
    }

    .new-member-badge {
        position: absolute;
        top: -0.5rem;
        left: 1rem;
        background-color: #dbf77e;
        color: black;
        padding: 0.3rem 0.8rem;
        border-radius: 5px;
        font-size: 0.9rem;
        z-index: 3;
    }

    .membership-card h3 {
        font-size: 1.8rem;
        margin-bottom: 0.5rem;
        color: #dbf77e;
    }

    .membership-tier {
        color: #bfbfbf;
        margin-bottom: 1.5rem;
        font-style: italic;
    }

    .membership-price {
        font-size: 2rem;
        color: #dbf77e;
        margin-bottom: 2rem;
    }

    .subscribe-btn {
        background: none;
        border: 2px solid #dbf77e;
        padding: 0.7rem 2rem;
        color: #dbf77e;
        border-radius: 10px;
        font-size: 1.1rem;
        cursor: pointer;
        transition: background-color 0.3s, color 0.3s;
    }

    .subscribe-btn:hover {
        background-color: #dbf77e;
        color: black;
    }
</style>