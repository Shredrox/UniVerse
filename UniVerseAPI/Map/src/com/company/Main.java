package com.company;

import javax.naming.OperationNotSupportedException;
import java.io.*;
import java.sql.SQLDataException;
import java.util.*;
import java.util.zip.DataFormatException;

public class Main {

    public static void main(String[] args) {
        Map<Integer, String> myMap = new HashMap<Integer, String>();
        myMap.put(1, "Chemistry");
        myMap.put(1, "Arts");
        myMap.put(2, "Bio");
        myMap.put(2, "French");

        for(Integer k : myMap.keySet()){
            System.out.println(myMap.get(k));
        }

        Iterator<Integer> iterator = myMap.keySet().iterator();
        while(iterator.hasNext()){
            System.out.println(myMap.get(iterator.next()));
        }

        Iterator<Map.Entry<Integer, String>> entryIterator = myMap.entrySet().iterator();
        while(entryIterator.hasNext()){
            System.out.println(entryIterator.next());
        }

        SortedMap<Integer, String> sMap = new TreeMap<Integer, String>();
        Map<Integer, String> strMap = new TreeMap<>();

        SortedMap<String, String> sortedMap = new TreeMap<String, String>();

        sortedMap.put("a", "1");
        sortedMap.put("c", "3");
        sortedMap.put("e", "5");
        sortedMap.put("d", "4");
        sortedMap.put("b", "2");

        SortedMap<String, String> subMap = sortedMap.subMap("b", "e");

        System.out.println(subMap);

        Properties prop = new Properties();
        prop.setProperty("key1", "property1");
        prop.setProperty("key2", "property2");
        prop.setProperty("key3", "property3");
        prop.setProperty("key4", "property4");

//        try (FileWriter fileWriter = new FileWriter("./prop.properties")){
//            prop.store(fileWriter, "Properties stored");
//        }catch (IOException e){
//            e.printStackTrace();
//        }

//        try(FileReader fileReader = new FileReader("./prop.properties")){
//            prop.load(fileReader);
//        }catch(IOException e){
//            e.printStackTrace();
//        }
//
//        Class aClass = Properties.class;
//        InputStream inputStream = aClass.getResourceAsStream("./prop.properties");
//        Properties asProperties = new Properties();
//
//        asProperties.put("abc", 999);
//
//        String abc = asProperties.getProperty("abc");
//        System.out.println(abc);

        Queue<String> queue = new LinkedList<String>();
        queue.add("Buffalo");
        queue.add("Drama");
        queue.add("Soros");
        queue.add("Seges");
        queue.add("Korona");

////        queue.poll();
////        queue.poll();
////        queue.poll();
////        queue.poll();
////        queue.poll();
//        System.out.println(queue.peek());

        Iterator<String> queueIterator = queue.iterator();
        while(iterator.hasNext()){
            System.out.println(iterator.next());
        }

        Deque<String> deque = new LinkedList<>();
        deque.add("element 1");
        deque.add("element 2");
        deque.add("element 3");
        deque.addFirst("element 0");
        deque.offerFirst("element -1");

        System.out.println(deque.peekFirst());
        System.out.println(deque.peekLast());

        Deque<String> stack = new ArrayDeque<>();

        Crooissant cr = new Crooissant(12, "Mavin");
        Crooissant cr2 = new Crooissant(12, "Onemo");
        Comparator<Crooissant> crooissantComparator = new Comparator<Crooissant>() {
            @Override
            public int compare(Crooissant o1, Crooissant o2) {
                return (o1.getManifacturer().compareToIgnoreCase(o2.getManifacturer()));
            }
        };


        System.out.println(callDivideTwoTimes());

    }

    public static int divide (int numberToDivide, int numberToDivideBy) throws BadNumberException{
        if(0==numberToDivideBy){
            throw new BadNumberException();
        }
        return numberToDivide/numberToDivideBy;
    }

    public static void callDivide() throws BadNumberException{
        int result = divide(5,2);
        System.out.println(result);
    }

    public static int callDivideTwoTimes(){
        try{
            callDivide();
        }catch (BadNumberException e){
            System.out.println(e.returnMessage());
        }
        return 0;
    }

    public void openFile(){
        FileReader reader = null;
        try{
            reader = new FileReader("someFile");
            int i = 0;
            while(i != -1){
                reader.read();
                System.out.println((char) i);
            }
            reader.close();
        }
        catch (IOException  ioException){
            System.out.println(ioException.getMessage());
        }
        finally {
            if (reader != null){
                try{
                    reader.close();
                }catch(IOException e){
                    System.out.println(e.getMessage());
                }
            }
        }
    }

    public void printFile() throws IOException{
        FileInputStream input = new FileInputStream("someFile.txt");
        try(input){
            int data = input.read();
            while(data != -1){
                System.out.println((char) data);
                data = input.read();
            }
        }
    }




}
