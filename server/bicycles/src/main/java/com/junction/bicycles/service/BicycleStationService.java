package com.junction.bicycles.service;

import com.junction.bicycles.dto.BicycleStationDTO;
import com.junction.bicycles.dto.MissionDTO;
import com.junction.bicycles.model.BicycleStation;
import com.junction.bicycles.model.Mission;
import com.junction.bicycles.repository.BicycleStationRepository;
import com.junction.bicycles.repository.MissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;


@Service
public class BicycleStationService {

    private static final String AZURE_PREDICT_BICYCLES = "/";
    private static final Integer CALCULATION_VAL_FOR_STATION = 20;
    private static final Long DEFAULT_SCORE = 1000L;
    private static final int MAX_MISSIONS = 2;

    private BicycleStationRepository bicycleStationRepository;
    private MissionRepository missionRepository;

    @Autowired
    public BicycleStationService(BicycleStationRepository bicycleStationRepository, MissionRepository missionRepository) {
        this.bicycleStationRepository = bicycleStationRepository;
        this.missionRepository = missionRepository;
    }

    public List<BicycleStationDTO> getAzurePredictionCall() {

        List<BicycleStation> bicycleStationList = bicycleStationRepository.findAll();

        List<BicycleStationDTO> convertedStations = new ArrayList<>();

        List<BicycleStation> underloadedStations = bicycleStationList.stream()
                .filter(this::getUnderloadedStation)
                .collect(Collectors.toList());

        List<BicycleStation> overloadedStations = bicycleStationList.stream()
                .filter(this::getOverloadedStations)
                .collect(Collectors.toList());


        overloadedStations.forEach(overloadedStation -> {

            List<Mission> assignedMissions = new ArrayList<>();
            List<MissionDTO> convertedOverloadedStationMissions = new ArrayList<>();

            Random random = new Random();
            for (int i = 0; i < MAX_MISSIONS; i++) {
                BicycleStation underloadedBicycleStation = underloadedStations.get(random.nextInt(underloadedStations.size()));
                Mission mission = new Mission();
                mission.setTitle("Take Bike here! -> " + underloadedBicycleStation.getName());
                mission.setDescription("Bikes are everywhere at " + overloadedStation.getName() + "! Please take it away and get 1000 Points!");
                mission.setDestination(underloadedBicycleStation);
                mission.setLonDestination(underloadedBicycleStation.getLon());
                mission.setLatDestination(underloadedBicycleStation.getLat());
                mission.setScore(DEFAULT_SCORE);
                missionRepository.save(mission);
                assignedMissions.add(mission);
            }

            for (Mission m : assignedMissions) {
                MissionDTO availableMission = MissionDTO.builder()
                        .id(m.getId())
                        .title("Take Bike here! -> " + m.getTitle())
                        .score(m.getScore())
                        .description("Bikes are everywhere at " + overloadedStation.getName() + "! Please take it away and get 1000 Points!")
                        .destination(m.getDestination())
                        .latDestination(m.getLatDestination())
                        .lonDestination(m.getLonDestination())
                        .build();
                convertedOverloadedStationMissions.add(availableMission);
            }

            bicycleStationList.forEach(bicycleStation -> {
                BicycleStationDTO convertedStationStation = BicycleStationDTO.builder()
                        .id(bicycleStation.getId())
                        .name(bicycleStation.getName())
                        .lat(bicycleStation.getLat())
                        .lon(bicycleStation.getLon())
                        .maxNumOfSlots(bicycleStation.getMaxNumOfSlots())
                        .currentNumOfBicycles(bicycleStation.getCurrentNumOfBicycles())
                        .missions(null)
                        .build();
                convertedStations.add(convertedStationStation);
            });

            convertedStations.forEach(station -> {
                if (station.getId().equals(overloadedStation.getId())) {
                    station.setMissions(convertedOverloadedStationMissions);
                }
            });
        });
        return convertedStations;
    }

    /**
     * @param e External Object
     * @return true if it is almost empty
     */
    private boolean getOverloadedStations(BicycleStation e) {
        return e.getCurrentNumOfBicycles() >= e.getMaxNumOfSlots();
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
