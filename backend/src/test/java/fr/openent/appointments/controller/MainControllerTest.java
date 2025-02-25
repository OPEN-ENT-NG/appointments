package fr.openent.appointments.controller;

import io.vertx.ext.unit.Async;
import io.vertx.ext.unit.TestContext;
import io.vertx.ext.unit.junit.VertxUnitRunner;
import org.junit.Test;
import org.junit.runner.RunWith;

@RunWith(VertxUnitRunner.class)
public class MainControllerTest {
    @Test
    public void test(TestContext ctx) {
        Async async = ctx.async();
        int expected = 1;
        int actual = 1;
        ctx.assertEquals(expected, actual);
        async.complete();
    }
}