import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-file-chooser',
  imports: [MatIconModule, FormsModule],
  templateUrl: './file-chooser.component.html',
  styleUrl: './file-chooser.component.scss',
})
export class FileChooserComponent {
  fichier?: File;

  @Output()
  envoieFichierAuParent = new EventEmitter<File | null>();

  onFichierSelectionne(event: any) {
    console.log(event);
    this.fichier = event.target.files[0];
    this.envoieFichierAuParent.emit(this.fichier);
  }
}
