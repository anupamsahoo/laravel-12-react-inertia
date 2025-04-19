<?php

namespace App\Http\Controllers;

use App\Models\PermissionName;
use DataTables;
use DB;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\View\View;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissionNameController extends Controller
{
    protected $_authUser;

    /**
     * Display a listing of the resource.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('permission:permission-list|permission-create|permission-edit|permission-delete',
            ['only' => ['index', 'store']]);
        $this->middleware('permission:permission-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:permission-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:permission-delete', ['only' => ['destroy']]);
        $this->_authUser = Auth::user();
    }

    /**
     * Display a listing of the resource.
     *
     *
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        // Fetch permissions data
        $data = PermissionName::orderBy('name', 'ASC')->get();

        // Process the permissions
        $permissions = $data->map(function ($model) {
            $permissionSlug = $model->alias;
            $permission = Permission::whereName([
                $permissionSlug.'-list', $permissionSlug.'-create', $permissionSlug.'-edit',
                $permissionSlug.'-delete',
            ])->first();

            $rolesHTML = [];
            if ($permission) {
                $rolesData = $permission->roles->pluck('name');
                foreach ($rolesData as $role) {
                    $rolesHTML[] = $role;
                }
            } else {
                // If no permission found, provide a fallback or empty content
                $rolesHTML[] = 'No Roles Assigned';
            }
            return [
                'id' => $model->id,
                'name' => $model->name ?: __('Name'),
                'assign_to' => $rolesHTML,
                'created_at' => $model->created_at->diffForHumans(),
                'permissionName' => ''
            ];
        });
        // Return the data to the Inertia.js frontend
        return Inertia::render('permissions/index', [
            'permissions' => $permissions
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): View
    {
        $permission = Permission::get();

        return view('roles.create', compact('permission'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @throws ValidationException
     */
    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {

        $this->validate($request, [
            'name' => 'required|unique:roles,name',
            'alias' => 'required'
        ],[
            'name.required' => 'Permission name is required',
            'alias.required' => 'Permission alias is required'
        ]);

        $permissionName = new PermissionName;
        $permissionName->name = $request->input('name');
        $permissionName->alias = $request->input('alias');
        $permissionName->save();
        $insertedId = $permissionName->id;
        if ($insertedId) {
            $permisssions_data = [
                $request->input('alias').'-list',
                $request->input('alias').'-create',
                $request->input('alias').'-edit',
                $request->input('alias').'-delete',
            ];
            $permisssions_data = [
                [
                    'name_id' => $insertedId, 'nice_name' => 'View '.ucwords($request->input('alias')),
                    'name' => $request->input('alias').'-list', 'guard_name' => 'web',
                    'created_at' => date('Y-m-d h:i:s'), 'updated_at' => date('Y-m-d h:i:s'),
                ],
                [
                    'name_id' => $insertedId, 'nice_name' => 'Create New '.ucwords($request->input('alias')),
                    'name' => $request->input('alias').'-create', 'guard_name' => 'web',
                    'created_at' => date('Y-m-d h:i:s'), 'updated_at' => date('Y-m-d h:i:s'),
                ],
                [
                    'name_id' => $insertedId, 'nice_name' => 'Edit '.ucwords($request->input('alias')),
                    'name' => $request->input('alias').'-edit', 'guard_name' => 'web',
                    'created_at' => date('Y-m-d h:i:s'), 'updated_at' => date('Y-m-d h:i:s'),
                ],
                [
                    'name_id' => $insertedId, 'nice_name' => 'Delete '.ucwords($request->input('alias')),
                    'name' => $request->input('alias').'-delete', 'guard_name' => 'web',
                    'created_at' => date('Y-m-d h:i:s'), 'updated_at' => date('Y-m-d h:i:s'),
                ],
            ];
            $permissionAdd = Permission::insert($permisssions_data);
            if ($permissionAdd) {
                return redirect()->route('permissions.index')->with('success', 'Permission created successfully.');
            } else {
                return redirect()->route('permissions.index')->with('error', 'Failed to add permission.');
            }

        } else {
            return redirect()->route('permissions.index')->with('error', 'Something ernt wrong.');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     */
    public function show($id): JsonResponse
    {
        $permissionName = PermissionName::find($id);
        /*return Inertia::render('permissions/index', [
            'permissionName' => $permissionName,
        ]);*/
        return response()->json(['status' => 'success', 'permissionName' => $permissionName]);
        //return view();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     */
    public function edit($id): View
    {
        return view();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     *
     * @throws ValidationException
     */
    public function update(Request $request, $id): \Illuminate\Http\RedirectResponse
    {
        $permissionName = PermissionName::find($id);
        $permissionName->name = $request->input('name');
        if ($permissionName->save()) {
            return redirect()->route('permissions.index')->with('success', 'Permission updated successfully.');
        } else {
            return redirect()->route('permissions.index')->with('error', 'Failed to update permission.');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     */
    public function destroy($id): \Illuminate\Http\RedirectResponse
    {
        $deletePermissions = DB::table('permissions')->where('name_id', $id)->delete();
        $deletePermissionName = DB::table('permission_names')->where('id', $id)->delete();

        if ($deletePermissions && $deletePermissionName) {
            return redirect()->route('permissions.index')->with('success', 'Permission deleted successfully.');
        } else {
            return redirect()->route('permissions.index')->with('error', 'Failed to deleted permission.');
        }
    }
}
