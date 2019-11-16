package com.junction.bicycles.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class BicycleStation {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String lat;
    private String lon;
    private Integer maxNumOfSlots;
    private Integer currentNumOfBicycles;

    @OneToMany
    private List<Mission> missions;

    public BicycleStation() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLon() {
        return lon;
    }

    public void setLon(String lon) {
        this.lon = lon;
    }

    public String getLat() {
        return lat;
    }

    public void setLat(String lat) {
        this.lat = lat;
    }

    public Integer getMaxNumOfSlots() {
        return maxNumOfSlots;
    }

    public void setMaxNumOfSlots(Integer maxNumOfSlots) {
        this.maxNumOfSlots = maxNumOfSlots;
    }

    public Integer getCurrentNumOfBicycles() {
        return currentNumOfBicycles;
    }

    public void setCurrentNumOfBicycles(Integer currentNumOfBicycles) {
        this.currentNumOfBicycles = currentNumOfBicycles;
    }

    public List<Mission> getMissions() {
        return missions;
    }

    public void setMissions(List<Mission> missions) {
        this.missions = missions;
    }
}
