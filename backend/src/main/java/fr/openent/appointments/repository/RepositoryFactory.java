package fr.openent.appointments.repository;

import org.entcore.common.sql.Sql;

import fr.openent.appointments.repository.impl.DefaultGridRepository;

public class RepositoryFactory {

    private final Sql sql;

    private final GridRepository gridRepository;

    public RepositoryFactory(Sql sql) {
        this.sql = sql;
        this.gridRepository = new DefaultGridRepository(this);
    }

    public Sql sql() {
        return this.sql;
    }

    public GridRepository gridRepository() {
        return this.gridRepository;
    }
}
