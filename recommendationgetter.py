import re
import sys
import json
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

# Spotify API credentials
client_id = '038a2eef7fdc4dc1a7a77ccb200f2b9c'
client_secret = 'd13c1bddc3be4362b3290e9f20d7b6e1'

# Initialize the Spotify API client using Client Credentials
sp = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id=client_id,
                                                                        client_secret=client_secret))

# Define the mapping of synonyms to music categories
keywords_to_categories = {
    "high_energy": ["workout", "exercise", "exciting", "fast paced", "intense"],
    "low_valence": ["sad", "rain", "depressed", "melancholy", "heartbroken"],
    "acoustic": ["relax", "calm", "soothing", "peaceful", "meditative"],
    "high_tempo": ["running", "jogging", "sprinting", "fast", "energetic"],
    "positive_valence": ["happy", "joyful", "cheerful", "uplifting", "bright"],
    "low_energy": ["chill", "lazy", "mellow", "smooth", "slow"],
    "danceable": ["party", "club", "dance", "groovy", "rhythmic"]
}

# Map categories to Spotify genres
category_to_genres = {
    "high_energy": ["electronic", "metal", "rock"],
    "low_valence": ["classical", "ambient"],
    "acoustic": ["acoustic", "folk"],
    "high_tempo": ["dance", "edm"],
    "positive_valence": ["pop", "rock"],
    "low_energy": ["ambient", "chill"],
    "danceable": ["dance", "disco", "house"]
}

# Detect negations and extract positive and negated keywords
def process_input(user_input):
    user_input = user_input.lower()
    negation_pattern = r"(not|don\'t|doesn\'t|no|won\'t)\s+(\w+)"
    negated_matches = re.findall(negation_pattern, user_input)
    negated_keywords = [match[1] for match in negated_matches]
    positive_input = re.sub(negation_pattern, '', user_input)
    detected_categories = [
        category for category, keywords in keywords_to_categories.items()
        if any(keyword in positive_input for keyword in keywords)
    ]
    excluded_categories = [
        category for category, keywords in keywords_to_categories.items()
        if any(keyword in negated_keywords for keyword in keywords)
    ]
    return detected_categories, excluded_categories

# Get seed genres based on categories
def get_seed_genres(included_categories):
    seed_genres = []
    for category in included_categories:
        if category in category_to_genres:
            genres = category_to_genres[category]
            seed_genres.extend(genres)
    seed_genres = list(set(seed_genres))
    seed_genres = seed_genres[:5]
    return seed_genres

def main():
    # Get user input from command-line arguments
    if len(sys.argv) > 1:
        user_input = ' '.join(sys.argv[1:])
    else:
        print(json.dumps({"error": "No input provided"}))
        return

    detected_categories, excluded_categories = process_input(user_input)

    if not detected_categories and not excluded_categories:
        print(json.dumps({"error": "No matching or excluded categories found. Please try again."}))
        return

    seed_genres = get_seed_genres(detected_categories)
    if not seed_genres:
        seed_genres = ['pop']  # Default fallback genre

    limit_per_genre = 10  # Number of tracks per genre to fetch

    try:
        tracks = []
        for genre in seed_genres:
            search_results = sp.search(q=f"genre:{genre}", type="track", limit=limit_per_genre)
            tracks.extend(search_results['tracks']['items'])

        if not tracks:
            print(json.dumps({"error": "No tracks found for the given seed genres."}))
            return

        # Build playlist data
        playlist = []
        for track in tracks:
            track_name = track['name']
            artist_names = ", ".join(artist['name'] for artist in track['artists'])
            album_name = track['album']['name']
            track_url = track['external_urls']['spotify']
            playlist.append({
                'track_name': track_name,
                'artist_names': artist_names,
                'album_name': album_name,
                'track_url': track_url
            })

        # Output the playlist as JSON
        print(json.dumps({"playlist": playlist}))
    except spotipy.exceptions.SpotifyException as e:
        print(json.dumps({"error": f"An error occurred while searching for tracks: {e}"}))

if __name__ == "__main__":
    main()
