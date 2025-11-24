export default function loadGoogleScript(callback){
    if(!document.getElementById("google-maps-script")){
        const script = document.createElement("script");
        script.id = "google-maps-script";
        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_FRONTEND_MAPS_KEY}&libraries=places`;
        script.defer = true;

        script.onload = () => {
            loadPlacesUI(callback);
        };

        document.body.appendChild(script);
    }else {
        loadPlacesUI(callback);
    }

}   


function loadPlacesUI(callback) {
  if (!document.getElementById("places-ui-script")) {
    const uiScript = document.createElement("script");
    uiScript.id = "places-ui-script";
    uiScript.src =
      "https://unpkg.com/@googlemaps/places@^1.3.0/dist/places.min.js";
    uiScript.defer = true;

    uiScript.onload = callback;
    document.body.appendChild(uiScript);
  } else {
    callback();
  }
}
