package com.company;

public class Crooissant implements Comparable<Crooissant>{
    private final int thickness;
    private final String manifacturer;

    public Crooissant(int thickness, String manifacturer) {
        this.thickness = thickness;
        this.manifacturer = manifacturer;
    }

    public int getThickness() {
        return thickness;
    }

    public String getManifacturer() {
        return manifacturer;
    }

    @Override
    public int compareTo(Crooissant o) {
        return this.thickness - o.thickness;
    }
}
