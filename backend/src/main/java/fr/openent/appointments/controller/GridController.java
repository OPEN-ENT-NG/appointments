package fr.openent.appointments.controller;

import fr.wseduc.rs.ApiDoc;
import fr.wseduc.rs.Get;

import io.vertx.core.http.HttpServerRequest;

import org.entcore.common.controller.ControllerHelper;

public class GridController extends ControllerHelper {

    public GridController() {
        super();
    }

    @Get("/grids")
    @ApiDoc("Get my grids")
    public void getMyGrids(final HttpServerRequest request) {
        
        renderJson(request, new JsonObject());
    }

    @Get("/grids/:id")
    @ApiDoc("Get grid by id")
    public void getGridById(final HttpServerRequest request) {
        
        renderJson(request, new JsonObject());
    }

    @Get("/users/:id/grids")
    @ApiDoc("Get user grids")
    public void getUserGrids(final HttpServerRequest request) {
        
        renderJson(request, new JsonObject());
    }

    @Post("/grids")
    @ApiDoc("Create grid")
    public void createGrid(final HttpServerRequest request) {
        
        renderJson(request, new JsonObject());
    }

    @Put("/grids/:id")
    @ApiDoc("Update grid")
    public void updateGrid(final HttpServerRequest request) {
        
        renderJson(request, new JsonObject());
    }

    @Delete("/grids/:id")
    @ApiDoc("Delete grid")
    public void deleteGrid(final HttpServerRequest request) {
        
        renderJson(request, new JsonObject());
    }
  
    
}
