package com.junction.bicycles;

import com.fasterxml.jackson.databind.MappingIterator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;
import com.junction.bicycles.model.BicycleStation;
import com.junction.bicycles.repository.BicycleStationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Component
public class Setup {

    private static final ObjectMapper objectMapper = new ObjectMapper();
    private static final Random random = new Random();

    @Autowired
    private BicycleStationRepository bicycleStationRepository;

    @PostConstruct
    public void setupBicycleStations() {
        try {
            CsvMapper mapper = new CsvMapper();
            InputStream stream = new ClassPathResource("helsinki_bicycle_data.csv").getInputStream();

            CsvSchema schema = mapper.schemaFor(Map.class).withHeader().withColumnReordering(true);
            ObjectReader reader = mapper.readerFor(Map.class).with(schema);
            List<Map> stations = reader.<Map>readValues(stream).readAll();

            stations.forEach(station -> {

                try {
                    BicycleStation newStation = new BicycleStation();
                    Map<String, Object> parsedData = objectMapper.readValue((String) station.get("data"), Map.class);

                    newStation.setId(Long.parseLong((String) station.get("FID")));
                    newStation.setName((String) station.get("name"));
                    newStation.setLat((String) station.get("Y"));
                    newStation.setLng((String) station.get("X"));
                    newStation.setMaxNumOfSlots(Integer.parseInt((String) station.get("total_slot")));
                    newStation.setCurrentNumOfBicycles((Integer) parsedData.get("avl_bikes"));

                    bicycleStationRepository.save(newStation);
                } catch (Exception ignore) {
                }
            });

        } catch (Exception e) {
            throw new RuntimeException("There was a problem during updating bicycles data.");
        }
    }

}
