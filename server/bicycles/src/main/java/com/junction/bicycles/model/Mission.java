package com.junction.bicycles.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Mission {

    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String description;
    @OneToOne
    private BicycleStation bicycleStationEntry;
    private String lonEntry;
    private String latEntry;
    @OneToOne
    private BicycleStation bicycleStationDestination;
    private String lonDestination;
    private String latDestinagtion;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BicycleStation getBicycleStationEntry() {
        return bicycleStationEntry;
    }

    public void setBicycleStationEntry(BicycleStation bicycleStationEntry) {
        this.bicycleStationEntry = bicycleStationEntry;
    }

    public BicycleStation getBicycleStationDestination() {
        return bicycleStationDestination;
    }

    public void setBicycleStationDestination(BicycleStation bicycleStationDestination) {
        this.bicycleStationDestination = bicycleStationDestination;
    }

    public String getLonEntry() {
        return lonEntry;
    }

    public void setLonEntry(String lonEntry) {
        this.lonEntry = lonEntry;
    }

    public String getLatEntry() {
        return latEntry;
    }

    public void setLatEntry(String latEntry) {
        this.latEntry = latEntry;
    }

    public String getLonDestination() {
        return lonDestination;
    }

    public void setLonDestination(String lonDestination) {
        this.lonDestination = lonDestination;
    }

    public String getLatDestinagtion() {
        return latDestinagtion;
    }

    public void setLatDestinagtion(String latDestinagtion) {
        this.latDestinagtion = latDestinagtion;
    }
}
