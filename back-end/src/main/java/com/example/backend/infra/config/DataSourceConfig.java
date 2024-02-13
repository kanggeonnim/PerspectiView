//package com.example.backend.infra.config;
//
//import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.boot.context.properties.ConfigurationProperties;
//import org.springframework.boot.jdbc.DataSourceBuilder;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.Primary;
//import org.springframework.jdbc.datasource.LazyConnectionDataSourceProxy;
//
//import javax.sql.DataSource;
//import java.util.HashMap;
//import java.util.Map;
//
//@Configuration
//public class DataSourceConfig {
//    private static final String MASTER_SERVER = "master";
//    private static final String SLAVE_SERVER = "slave";
//
//    @Bean
//    @Qualifier(MASTER_SERVER)
//    @ConfigurationProperties(prefix = "spring.datasource.master.hikari")
//    public DataSource masterDataSource() {
//        return DataSourceBuilder.create()
//                .build();
//    }
//
//    @Bean
//    @Qualifier(SLAVE_SERVER)
//    @ConfigurationProperties(prefix = "spring.datasource.slave.hikari")
//    public DataSource slaveDataSource() {
//        return DataSourceBuilder.create()
//                .build();
//    }
//
//    @Primary
//    @Bean
//    public DataSource dataSource(@Qualifier("routingDataSource") DataSource routingDataSource) {
//        return new LazyConnectionDataSourceProxy(routingDataSource);
//    }
//
//    @Bean
//    public DataSource routingDataSource(
//            @Qualifier("masterDataSource") DataSource masterDataSource,
//            @Qualifier("slaveDataSource") DataSource slaveDataSource)
//    {
//        RoutingDataSource routingDataSourceImpl = new RoutingDataSource();
//        Map<Object, Object> targetDataSource = new HashMap<>();
//        targetDataSource.put("master", masterDataSource);
//        targetDataSource.put("slave", slaveDataSource);
//        routingDataSourceImpl.setTargetDataSources(targetDataSource);
//        routingDataSourceImpl.setDefaultTargetDataSource(masterDataSource);
//        return routingDataSourceImpl;
//    }
//
//}
