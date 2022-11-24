import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RamComponent } from './containers/ram/ram.component';
import { RomComponent } from './containers/rom/rom.component';
import { ColorComponent } from './containers/color/color.component';
import { AddRomComponent } from './components/rom-add/add-rom.component';
import { EditRomComponent } from './components/rom-edit/edit-rom.component';
import { EditRamComponent } from './components/ram-edit/edit-ram.component';
import { AddRamComponent } from './components/ram-add/add-ram.component';
import { AddColorComponent } from './components/color-add/add-color.component';
import { EditColorComponent } from './components/color-edit/edit-color.component';
import { BaseService } from '../services/base.service';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfigurationManagerouts } from '../common/routes';
import { HttpClientModule } from '@angular/common/http';
import { AppShareMaterialUiModule } from '../base-core-ui/app.share.material.ui.module';
import { RomService } from './service/rom.service';
import { RamService } from './service/ram.service';
import { ColorService } from './service/color.service';

@NgModule({
  declarations: [
    RamComponent,
    RomComponent,
    ColorComponent,
    AddRomComponent,
    EditRomComponent,
    EditRamComponent,
    AddRamComponent,
    AddColorComponent,
    EditColorComponent,
  ],
  imports: [
    CommonModule,
    AppShareMaterialUiModule,
    HttpClientModule,
    RouterModule.forChild(ConfigurationManagerouts),
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  providers: [RomService, RamService, ColorService, BaseService],
})
export class ProductConfigurationModule {}
