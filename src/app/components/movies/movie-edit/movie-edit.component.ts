import {Component, inject, Input, OnInit, ViewChild} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MovieApiService} from "../../../services/movie-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-movie-edit',
  standalone: true,
  imports: [
    FaIconComponent,
    ReactiveFormsModule
  ],
  templateUrl: './movie-edit.component.html',
  styleUrl: './movie-edit.component.css'
})
export class MovieEditComponent implements OnInit{
  // Lo que recogemos por variables
  @Input("id") id!: string;

  editar:boolean = false;

  private readonly movieService:MovieApiService = inject(MovieApiService);
  private readonly router:Router = inject(Router);

  private readonly formBuilder:FormBuilder = inject(FormBuilder);
  formMovie:FormGroup = this.formBuilder.group(
    {
      _id: [""],
      title: ["",[Validators.required, Validators.minLength(2)]],
      year: ["",[Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      director: ["",[Validators.required, Validators.minLength(5)]],
      plot: ["",[Validators.required, Validators.minLength(10)]],
      poster: ["",[Validators.required]],
    }
  );

  // GETTERS

  get title():any{
    return this.formMovie.get("title");
  }
  get year():any{
    return this.formMovie.get("year");
  }
  get director():any{
    return this.formMovie.get("director");
  }
  get plot():any{
    return this.formMovie.get("plot");
  }
  get poster():any{
    return this.formMovie.get("poster");
  }

  ngOnInit() {
    if (this.id){
      // Estamos editando
      this.loadMovie();
    }else {
      // Estamos añadiendo
      this.editar = true;
      this.formMovie.reset();
    }

  }

  private loadMovie() {
    this.movieService.getOnMovie(this.id).subscribe(
      {
        next: value => {
          this.formMovie.patchValue(value);
          this.editar = true;
        },
        error: err => {console.log(err)},
        complete:() => console.log("loaded"),
      }
    )
  }

  onSubmit() {
    if (this.formMovie.invalid){
      this.formMovie.markAllAsTouched();
      return;
    }
    if (this.id){
      // Edit
      this.movieService.updateMovie(this.id,this.formMovie.getRawValue()).subscribe(
        {
          next: value => {
            console.log(value);
            this.router.navigateByUrl("movie-list");
          },
          error: err => console.error(err),
          complete: () => console.log("editado con exito")
        }
      )

    } else {
      // Add
      this.movieService.insertMovie(this.formMovie.getRawValue()).subscribe(
        {
          next: value => {
            console.log(value);
            this.router.navigateByUrl("movie-list");
          },
          error: err => console.log(err),
          complete: () => console.log("insertado con exito")
        }
      )

    }
  }

}
