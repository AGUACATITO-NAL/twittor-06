// Función para actualizar la caché dinámica con una nueva respuesta
function actualizaCacheDinamico(dynamicCache, req, res) {
    // Verifica si la respuesta fue exitosa (código de estado 200-299)
    if (res.ok) {
        // Abre o crea la caché dinámica
        return caches.open(dynamicCache).then(cache => {
            // Almacena en la caché la solicitud y su respuesta clonada
            cache.put(req, res.clone());
            // Retorna la respuesta original clonada
            return res.clone();
        });
    } else {
        // Si la respuesta no fue exitosa, simplemente retorna la respuesta original
        return res;
    }
}
