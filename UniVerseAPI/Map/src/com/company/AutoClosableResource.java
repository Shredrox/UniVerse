package com.company;

import java.io.FileInputStream;

public class AutoClosableResource implements AutoCloseable{
    public String name = null;
    public boolean exceptionThrownOnClose = false;

    public AutoClosableResource(String name, boolean exceptionThrownOnClose) {
        this.name = name;
        this.exceptionThrownOnClose = exceptionThrownOnClose;
    }

    public void doOp(boolean throwException) throws Exception{
        System.out.println("Resource " + this.name + " is doing an operation.");
        if(throwException){
            throw new Exception("Resource " + this.name + " throws an exception.");
        }
    }

    @Override
    public void close() throws Exception {
        System.out.println("Resource " + this.name + ".close() is called.");
        if(this.exceptionThrownOnClose){
            throw new Exception("Resource " + this.name + " throws an exception on attempt to close.");
        }
    }

    public static void main(String[] args) {
        try{
            tryWithSingleResource();
        }catch (Exception e){
            e.printStackTrace();
            Throwable[] surpressed = e.getSuppressed();
            System.out.println("Surpressed - " + surpressed);
        }
    }

    public static void tryWithSingleResource() throws Exception{
        AutoClosableResource autoClosableResource = new AutoClosableResource("one", false);
        try(autoClosableResource){
            autoClosableResource.doOp(true);

        }
    }
}
