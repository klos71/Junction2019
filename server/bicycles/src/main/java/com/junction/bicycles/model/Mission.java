package com.junction.bicycles.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Mission {

    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String description;

    @ManyToOne
    private BicycleStation bicycleStation;

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

    public BicycleStation getBicycleStation() {
        return bicycleStation;
    }

    public void setBicycleStation(BicycleStation bicycleStation) {
        this.bicycleStation = bicycleStation;
    }
}
