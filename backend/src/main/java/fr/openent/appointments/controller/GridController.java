package fr.openent.appointments.controller;

import fr.wseduc.rs.ApiDoc;
import fr.wseduc.rs.Get;
import fr.wseduc.rs.Post;
import fr.wseduc.rs.Put;
import fr.wseduc.rs.Delete;
import fr.wseduc.webutils.request.RequestUtils;

import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonObject;

import org.entcore.common.controller.ControllerHelper;

import fr.openent.appointments.model.grid.PayloadGrid;
import fr.openent.appointments.service.GridService;
import fr.openent.appointments.service.impl.DefaultGridService;

public class GridController extends ControllerHelper {
    private final GridService gridService;

    public GridController() {
        super();
        this.gridService = new DefaultGridService();
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
        RequestUtils.bodyToJson(request, grid -> {
            if (grid == null) {
                badRequest(request);
                return;
            }

        });
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
