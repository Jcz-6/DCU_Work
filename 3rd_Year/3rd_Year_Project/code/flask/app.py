import json
from flask import Flask, jsonify, request
from flask_socketio import SocketIO
import requests

app = Flask(__name__)

app.config.from_pyfile('settings.py')
socketio = SocketIO(app, host='0.0.0.0', port="5000", cors_allowed_origins=["http://localhost:8000", "http://127.0.0.1:8000", "http://localhost:4173", "http://127.0.0.1:4173", "http://localhost:5173", "http://127.0.0.1:5173", "http://172.20.10.3:8000"])

@socketio.on('connect')
def connect_return():
    print("it works")

@socketio.on('locationData')
def get_data(data):
    print("Received:", data)
 

    # Parse the JSON data received from the client
    try:
        data_dict = json.loads(data)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return

    # Here is where we get the users data on the frontend page to query the backend
    latitude = data_dict.get('lat')
    longitude = data_dict.get('lng')  

    url = f"http://api:8000/profile/vets?lat={latitude}&lng={longitude}"
    response = requests.get(str(url))
    data = response.json()
    print(data)
    # initialize list for storing data to format
    formatted_data = []
    for item in data:
        location_str = item["location"]
        # The get lat and long function wasnt working so i had to use string manipulation
        location_parts = location_str.split("(")[1].split(")")[0].split()
        longitude = float(location_parts[0])
        latitude = float(location_parts[1])
        print(item)
        # Here we grab the data we wish to display
        formatted_item = {
            "id": item["id"],
            "distance": item["distance"],
            "name": item["name"],
            "bio": item["bio"],
            "lat": latitude,
            "lng": longitude,
        }
        formatted_data.append(formatted_item)
    # Send the data to the connected frontend page    
    socketio.emit('formattedData', formatted_data)


@socketio.on('locationDataOrg')
def get_data(data):
    print("Received:", data)
 

    # Parse the JSON data received from the client
    try:
        data_dict = json.loads(data)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return

    latitude = data_dict.get('lat')
    longitude = data_dict.get('lng')  

    url = f"http://api:8000/profile/orgs?lat={latitude}&lng={longitude}"
    response = requests.get(str(url))
    data = response.json()
    print(data)
    formatted_data = []
    for item in data:
        location_str = item["location"]
        # The get lat and long function wasnt working so i had to use string manipulation
        location_parts = location_str.split("(")[1].split(")")[0].split()
        longitude = float(location_parts[0])
        latitude = float(location_parts[1])
        print(item)
        formatted_item = {
            "id": item["id"],
            "distance": item["distance"],
            "name": item["name"],
            "bio": item["bio"],
            "specialty": item["specialty"],
            "lat": latitude,
            "lng": longitude,
        }
        formatted_data.append(formatted_item)
    socketio.emit('formattedDataOrg', formatted_data)

@app.route('/')
def index():
    return "Flask server running..."

if __name__ == '__main__':
    socketio.run(app)