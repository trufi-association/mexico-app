const { osmToGtfs, OSMOverpassDownloader } = require('../..')

osmToGtfs({
    outputFiles: { outputDir: __dirname + '/out', trufiTPData: true, gtfs: true, },
    geojsonOptions: {
        osmDataGetter: new OSMOverpassDownloader({
            south: 19.201667,
            west: -100.477837,
            north: 19.545306,
            east: -100.211988,
        }), skipRoute: (route) => {
            return ![2084702].includes(route.id)
        }
    },
    gtfsOptions: {
        fakeStops: (routeFeature) => [].includes(routeFeature.properties.id),
        stopNameBuilder: (stops) => {
            if (!stops || stops.length == 0) {
                stops = ["Innominada"]
            }
            return stops.join(" y ")
        },
        agencyTimezone: "America/Mexico_City",
        agencyUrl: "https://example.com/",
        defaultFares: { currencyType: "MXN" },
        feed: {
            publisherUrl: "https://example.com",
            publisherName: "Zamora",
            lang: "es",
            version: new Date().toUTCString(),
            contactEmail: "email@example.com",
            contactUrl: "http://support.example.com",
            startDate: "20000101",
            endDate: "21000101",
            id: "zamora-me"
        }
    }
}).catch(error => console.error(error))
