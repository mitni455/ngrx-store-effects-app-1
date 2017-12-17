import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import * as pizzaActions from '../actions/pizzas.action';
import * as fromServices from '../../services';

@Injectable()
export class PizzasEffects {
  constructor(private actions$: Actions, private pizzaService: fromServices.PizzasService) {

  }

  @Effect()
  loadPizzas$ = this.actions$.ofType(pizzaActions.LOAD_PIZZAS)
    .pipe(
    switchMap(() => {
      return this.pizzaService.getPizzas().pipe(
        map((pizzas) => {
          return new pizzaActions.LoadPizzasSuccess(pizzas);
        }),
        catchError((error) => {
          return of(new pizzaActions.LoadPizzasFail(error));
        })
      )
    })
    )

  @Effect()
  createPizzas$ = this.actions$.ofType(pizzaActions.CREATE_PIZZA)
    .pipe(
    map((action: pizzaActions.CreatePizza) => action.payload),
    switchMap((pizza) => {
      return this.pizzaService.createPizza(pizza).pipe(
        map((pizza) => {
          return new pizzaActions.CreatePizzaSuccess(pizza);
        }),
        catchError((error) => {
          return of(new pizzaActions.CreatePizzaFail(error));
        })
      )
    })
    )

  @Effect()
  updatePizzas$ = this.actions$.ofType(pizzaActions.UPDATE_PIZZA)
    .pipe(
    map((action: pizzaActions.UpdatePizza) => action.payload),
    switchMap((pizza) => {
      return this.pizzaService.updatePizza(pizza).pipe(
        map((pizza) => {
          return new pizzaActions.UpdatePizzaSuccess(pizza);
        }),
        catchError((error) => {
          return of(new pizzaActions.UpdatePizzaFail(error));
        })
      )
    })
    )

    @Effect()
    removePizzas$ = this.actions$.ofType(pizzaActions.REMOVE_PIZZA)
      .pipe(
      map((action: pizzaActions.RemovePizza) => action.payload),
      switchMap((pizza) => {
        return this.pizzaService.removePizza(pizza).pipe(
          map(() => {
            return new pizzaActions.RemovePizzaSuccess(pizza);
          }),
          catchError((error) => {
            return of(new pizzaActions.RemovePizzaFail(error));
          })
        )
      })
      )
  
}