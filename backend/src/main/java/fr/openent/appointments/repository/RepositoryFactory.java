package fr.openent.appointments.repository;

import fr.openent.appointments.repository.impl.*;
import org.entcore.common.sql.Sql;
import org.entcore.common.neo4j.Neo4j;

public class RepositoryFactory {

    private final Sql sql;
    private final Neo4j neo4j;

    private final TimeSlotRepository timeSlotRepository;
    private final DailySlotRepository dailySlotRepository;
    private final GridRepository gridRepository;
    private final CommunicationRepository communicationRepository;
    private final AppointmentRepository appointmentRepository;

    public RepositoryFactory(Sql sql, Neo4j neo4j) {
        this.sql = sql;
        this.neo4j = neo4j;
        this.timeSlotRepository = new DefaultTimeSlotRepository(this);
        this.dailySlotRepository = new DefaultDailySlotRepository(this);
        this.gridRepository = new DefaultGridRepository(this);
        this.communicationRepository = new DefaultCommunicationRepository(this);
        this.appointmentRepository = new DefaultAppointmentRepository(this);
    }

    public Sql sql() {
        return this.sql;
    }

    public Neo4j neo4j() {
        return this.neo4j;
    }

    public GridRepository gridRepository() {
        return this.gridRepository;
    }

    public DailySlotRepository dailySlotRepository() {
        return this.dailySlotRepository;
    }

    public TimeSlotRepository timeSlotRepository() {
        return this.timeSlotRepository;
    }

    public CommunicationRepository communicationRepository() {
        return this.communicationRepository;
    }

    public AppointmentRepository appointmentRepository() { return this.appointmentRepository; }
}
