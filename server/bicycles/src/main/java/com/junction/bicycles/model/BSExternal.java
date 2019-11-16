package com.junction.bicycles.model;

/**
 * Bicycle Station External Object
 * Used for consuming Azure APIs
 */
public class BSExternal {

    private Long id;
    private Integer numberOfBicycles;
    private Integer maxNumberOfBicycles;

    public BSExternal() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getMaxNumberOfBicycles() {
        return maxNumberOfBicycles;
    }

    public void setMaxNumberOfBicycles(Integer maxNumberOfBicycles) {
        this.maxNumberOfBicycles = maxNumberOfBicycles;
    }

    public Integer getNumberOfBicycles() {
        return numberOfBicycles;
    }

    public void setNumberOfBicycles(Integer numberOfBicycles) {
        this.numberOfBicycles = numberOfBicycles;
    }
}
