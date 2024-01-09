<div class="row">
    <div class="col-sm-12 col-md-6">
        <div class="dt-buttons">
            <button class="btn btn-outline-light buttons-copy buttons-html5" tabindex="0" aria-controls="example" type="button">
                <span>Copy</span>
            </button>
            <button class="btn btn-outline-light buttons-excel buttons-html5" tabindex="0" aria-controls="example" type="button">
                <span>Excel</span>
            </button>
            <button class="btn btn-outline-light buttons-pdf buttons-html5" tabindex="0" aria-controls="example" type="button">
                <span>PDF</span>
            </button>
            <button class="btn btn-outline-light buttons-print" tabindex="0" aria-controls="example" type="button">
                <span>Print</span>
            </button>
            <button class="btn btn-outline-light buttons-collection dropdown-toggle buttons-colvis" tabindex="0" aria-controls="example" type="button" aria-haspopup="true">
                <span>Column visibility</span>
            </button>
        </div>
    </div>
    <div class="col-sm-12 col-md-6">
        <div id="example_filter" class="dataTables_filter">
            <label>Search:<input type="search" class="form-control form-control-sm" placeholder="" aria-controls="example"></label>
        </div>
    </div>
</div>


<div id="DataTables_Table_0_filter" class="dataTables_filter">
    <label>Search:<input type="search" class="form-control form-control-sm" placeholder="" aria-controls="DataTables_Table_0"></label>
</div>

<td class="text-center">

    @can('edit posts', Post::class)
        <a href="{{ route('post.edit', $post->id) }}" class="btn btn-sm btn-primary">EDIT</a>
    @endcan

    @can('delete posts', Post::class)
        <form onsubmit="return confirm('Apakah Anda Yakin ?');" action="{{ route('post.destroy', $post->id) }}" method="POST">

            @csrf
            @method('DELETE')
            <button type="submit" class="btn btn-sm btn-danger">HAPUS</button>
        </form>

    @endcan

    @can('publish posts', Post::class)
    <form onsubmit="return confirm('Publish post ini?');" action="{{ route('post.publish', $post->id) }}" method="POST">

        @csrf
        @method('PUT')
        <button type="submit" class="btn btn-sm btn-info">Publish</button>
    </form>

    @endcan

    @can('unpublish posts', Post::class)
    <form onsubmit="return confirm('Unpublish post ini?');" action="{{ route('post.unpublish', $post->id) }}" method="POST">

        @csrf
        @method('PUT')
        <button type="submit" class="btn btn-sm btn-info">Unpublish</button>
    </form>

    @endcan

</td>
