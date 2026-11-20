import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    success(title: string, text: string): Promise<void> {
        return Swal.fire({
            icon: 'success',
            title,
            text,
            confirmButtonText: 'Aceptar'
        }).then(() => { });
    }

    error(title: string, text: string): Promise<void> {
        return Swal.fire({
            icon: 'error',
            title,
            text,
            confirmButtonText: 'Aceptar'
        }).then(() => { });
    }

    warning(title: string, text: string): Promise<void> {
        return Swal.fire({
            icon: 'warning',
            title,
            text,
            confirmButtonText: 'Aceptar'
        }).then(() => { });
    }

    async confirm(title: string, text: string): Promise<boolean> {
        const result = await Swal.fire({
            icon: 'question',
            title,
            text,
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        });

        return result.isConfirmed;
    }
}