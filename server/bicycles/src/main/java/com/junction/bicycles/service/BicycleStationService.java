package com.junction.bicycles.service;

import com.junction.bicycles.model.BSExternal;
import com.junction.bicycles.model.BicycleStation;
import com.junction.bicycles.model.Mission;
import com.junction.bicycles.repository.BicycleStationRepository;
import com.junction.bicycles.repository.MissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;


@Service
public class BicycleStationService {

    private static final String AZURE_PREDICT_BICYCLES = "/";
    private static final Integer CALCULATION_VAL_FOR_STATION = 20;

    private BicycleStationRepository bicycleStationRepository;
    private MissionRepository missionRepository;

    @Autowired
    public BicycleStationService(BicycleStationRepository bicycleStationRepository, MissionRepository missionRepository) {
        this.bicycleStationRepository = bicycleStationRepository;
        this.missionRepository = missionRepository;
    }

    //TODO Add predictions
    public List<BSExternal> getAzurePredictions() {
        return null;
    }

    public List<BicycleStation> createMissions() {
        List<BicycleStation> bicycleStationList = bicycleStationRepository.findAll();

        List<BicycleStation> underloadedStations = bicycleStationList.stream()
                .filter(this::getUnderloadedStation)
                .collect(Collectors.toList());

        List<BicycleStation> overloadedStations = bicycleStationList.stream()
                .filter(this::getOverloadedStations)
                .collect(Collectors.toList());

        overloadedStations.forEach(bicycleStation -> {
            List<BicycleStation> underloadedBicycleMissions = new ArrayList<>();
            Random random = new Random();
            for (int i = 0; i < 2; i++) {
                BicycleStation bsMission = overloadedStations.get(random.nextInt(overloadedStations.size()));
                underloadedBicycleMissions.add(bsMission);
            }

            for (BicycleStation bsDestination : underloadedBicycleMissions) {
                Mission mission = new Mission();
                mission.setTitle("Take Bike From -> " + bicycleStation.getName());
                mission.setDescription("There are a lot of bike around, please take it at " + bicycleStation.getName() + " and bring it to " + bsDestination.getName());
                mission.setBicycleStationEntry(bicycleStation);
                mission.setBicycleStationDestination(bsDestination);
                missionRepository.save(mission);
            }

        });

        return bicycleStationList;
    }

    /**
     * percentage based calculation 20%
     *
     * @param e External Object
     * @return true if it is almost empty
     */
    private boolean getOverloadedStations(BicycleStation e) {
        return e.getCurrentNumOfBicycles() <= e.getMaxNumOfSlots();
    }

    /**
     * percentage based calculation 20%
     *
     * @param e External Object
     * @return true if it is almost empty
     */
    private boolean getUnderloadedStation(BicycleStation e) {
        int max = e.getMaxNumOfSlots();
        int current = e.getCurrentNumOfBicycles();
        int val = current * 100 / max;
        return val <= CALCULATION_VAL_FOR_STATION;
    }
}
